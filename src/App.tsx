/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  UserProfile,
  RoomSettings,
  PlacedItem,
  FurnitureDefinition,
} from './types/room';
import {
  FURNITURE_CATALOG,
  STARTER_OWNED_ITEM_IDS,
  WALL_COLORS,
  FLOOR_OPTIONS,
} from './data/furnitureData';
import { PRESET_ROOMS } from './components/RoomPresetsModal';
import { RoomCanvas } from './components/RoomCanvas';
import { FurnitureCatalog } from './components/FurnitureCatalog';
import { ItemControlGizmo } from './components/ItemControlGizmo';
import { RoomSettingsBar } from './components/RoomSettingsBar';
import { ProfileModal } from './components/ProfileModal';
import { PhotoModeModal } from './components/PhotoModeModal';
import { RoomPresetsModal } from './components/RoomPresetsModal';
import { MiniGameModal } from './components/MiniGameModal';
import { soundManager } from './utils/audio';
import {
  Home,
  User,
  Camera,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  Coins,
  Gamepad2,
  Plus,
} from 'lucide-react';

const STORAGE_KEY_PROFILE = 'cozy_room_profile_v1';
const STORAGE_KEY_ITEMS = 'cozy_room_items_v1';
const STORAGE_KEY_SETTINGS = 'cozy_room_settings_v1';
const STORAGE_KEY_AVATAR_POS = 'cozy_room_avatar_pos_v1';
const STORAGE_KEY_COINS = 'cozy_room_coins_v1';
const STORAGE_KEY_OWNED = 'cozy_room_owned_v1';

const DEFAULT_PROFILE: UserProfile = {
  name: '루나',
  gender: 'female',
  roomName: '햇살 머무는 아늑한 다락방',
  avatar: {
    skinTone: '#FFDFC4',
    hairStyle: 'long',
    hairColor: '#4A3425',
    shirtColor: '#FF7675',
    expression: 'smile',
  },
};

const DEFAULT_SETTINGS: RoomSettings = {
  wallColor: '#FBF7EE',
  wallPattern: 'solid',
  floorType: 'wood-warm',
  timeOfDay: 'day',
  weather: 'sunny',
  showGrid: false,
  gridSnap: true,
  musicEnabled: false,
  sfxEnabled: true,
};

const INITIAL_ITEMS: PlacedItem[] = PRESET_ROOMS[0].items;

export default function App() {
  // Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_PROFILE;
  });

  // Check if first time visiting
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(() => {
    return !localStorage.getItem(STORAGE_KEY_PROFILE);
  });
  const [isFirstTime, setIsFirstTime] = useState<boolean>(() => {
    return !localStorage.getItem(STORAGE_KEY_PROFILE);
  });

  // Coin Economy State
  const [coins, setCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COINS);
      if (saved) return Number(saved);
    } catch {}
    return 1000; // Starter fund
  });

  // Owned Item IDs
  const [ownedItemIds, setOwnedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_OWNED);
      if (saved) return JSON.parse(saved);
    } catch {}
    return STARTER_OWNED_ITEM_IDS;
  });

  // Room Settings
  const [roomSettings, setRoomSettings] = useState<RoomSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_SETTINGS;
  });

  // Placed Items
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ITEMS;
  });

  // Undo / Redo History Stack
  const [history, setHistory] = useState<PlacedItem[][]>([INITIAL_ITEMS]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Selected Item
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Draggable Avatar Position
  const [avatarPos, setAvatarPos] = useState<{ x: number; y: number }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AVATAR_POS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { x: 380, y: 390 };
  });

  // Modals
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isPresetsModalOpen, setIsPresetsModalOpen] = useState(false);
  const [isMiniGameModalOpen, setIsMiniGameModalOpen] = useState(false);

  // Canvas container reference
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Persistence to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COINS, String(coins));
    } catch {}
  }, [coins]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_OWNED, JSON.stringify(ownedItemIds));
    } catch {}
  }, [ownedItemIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(placedItems));
    } catch {}
  }, [placedItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(roomSettings));
    } catch {}
  }, [roomSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AVATAR_POS, JSON.stringify(avatarPos));
    } catch {}
  }, [avatarPos]);

  // Coin Purchase Handler
  const handleBuyItem = (itemDef: FurnitureDefinition): boolean => {
    if (coins < itemDef.price) return false;

    setCoins((prev) => prev - itemDef.price);
    const updatedOwned = [...ownedItemIds, itemDef.id];
    setOwnedItemIds(updatedOwned);

    // Place the newly bought item right into the room as an instant reward!
    handleAddItem(itemDef);
    return true;
  };

  // Mini-game Coin Reward Handler
  const handleEarnCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
    soundManager.playSparkle();
  };

  // Push new state to history stack
  const pushHistory = (newItems: PlacedItem[]) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newItems);
    if (updatedHistory.length > 25) {
      updatedHistory.shift();
    }
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setPlacedItems(newItems);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      soundManager.playRotate();
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setPlacedItems(prev);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      soundManager.playRotate();
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setPlacedItems(next);
    }
  };

  // Add Item to Room
  const handleAddItem = (itemDef: FurnitureDefinition) => {
    const defaultY = itemDef.isWallItem ? 25 : 62;
    const defaultX = 50 + (Math.random() * 12 - 6);

    const newItem: PlacedItem = {
      instanceId: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      itemId: itemDef.id,
      x: defaultX,
      y: defaultY,
      rotation: 0,
      flipped: false,
      scale: 1,
      colorVariantIndex: 0,
      zIndex: itemDef.isFloorRug ? 2 : itemDef.isWallItem ? 15 : 50,
    };

    const nextItems = [...placedItems, newItem];
    pushHistory(nextItems);
    setSelectedItemId(newItem.instanceId);
  };

  // Update item position during or after drag
  const handleUpdateItemPosition = (id: string, x: number, y: number) => {
    setPlacedItems((prev) =>
      prev.map((item) => (item.instanceId === id ? { ...item, x, y } : item))
    );
  };

  // Item Gizmo Controls
  const selectedItem = placedItems.find((i) => i.instanceId === selectedItemId) || null;
  const selectedItemDef = selectedItem
    ? FURNITURE_CATALOG.find((f) => f.id === selectedItem.itemId)
    : undefined;

  const handleRotateItem = () => {
    if (!selectedItemId) return;
    soundManager.playRotate();
    const nextItems = placedItems.map((item) => {
      if (item.instanceId === selectedItemId) {
        const nextRot = ((item.rotation + 90) % 360) as 0 | 90 | 180 | 270;
        return { ...item, rotation: nextRot };
      }
      return item;
    });
    pushHistory(nextItems);
  };

  const handleFlipItem = () => {
    if (!selectedItemId) return;
    soundManager.playRotate();
    const nextItems = placedItems.map((item) =>
      item.instanceId === selectedItemId ? { ...item, flipped: !item.flipped } : item
    );
    pushHistory(nextItems);
  };

  const handleDeleteItem = () => {
    if (!selectedItemId) return;
    soundManager.playDelete();
    const nextItems = placedItems.filter((item) => item.instanceId !== selectedItemId);
    pushHistory(nextItems);
    setSelectedItemId(null);
  };

  const handleDuplicateItem = () => {
    if (!selectedItem) return;
    soundManager.playPlace();
    const duplicated: PlacedItem = {
      ...selectedItem,
      instanceId: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      x: Math.min(90, selectedItem.x + 6),
      y: Math.min(88, selectedItem.y + 4),
    };
    const nextItems = [...placedItems, duplicated];
    pushHistory(nextItems);
    setSelectedItemId(duplicated.instanceId);
  };

  const handleBringForward = () => {
    if (!selectedItemId) return;
    soundManager.playRotate();
    const nextItems = placedItems.map((item) =>
      item.instanceId === selectedItemId ? { ...item, zIndex: item.zIndex + 10 } : item
    );
    pushHistory(nextItems);
  };

  const handleSendBackward = () => {
    if (!selectedItemId) return;
    soundManager.playRotate();
    const nextItems = placedItems.map((item) =>
      item.instanceId === selectedItemId
        ? { ...item, zIndex: Math.max(1, item.zIndex - 10) }
        : item
    );
    pushHistory(nextItems);
  };

  const handleChangeColorVariant = (idx: number) => {
    if (!selectedItemId) return;
    soundManager.playRotate();
    const nextItems = placedItems.map((item) =>
      item.instanceId === selectedItemId ? { ...item, colorVariantIndex: idx } : item
    );
    pushHistory(nextItems);
  };

  const handleScaleChange = (scale: number) => {
    if (!selectedItemId) return;
    const nextItems = placedItems.map((item) =>
      item.instanceId === selectedItemId ? { ...item, scale } : item
    );
    pushHistory(nextItems);
  };

  const handleResetRoom = () => {
    if (confirm('방에 놓인 가구를 모두 보관함(인벤토리)으로 되돌리시겠습니까? (가구 소유권은 안전하게 보존됩니다)')) {
      soundManager.playDelete();
      pushHistory([]);
      setSelectedItemId(null);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_ROOMS[0]) => {
    // When loading preset, also grant ownership of these preset items so player can customize them
    const newOwnedIds = Array.from(new Set([...ownedItemIds, ...preset.items.map((i) => i.itemId)]));
    setOwnedItemIds(newOwnedIds);

    setRoomSettings((prev) => ({
      ...prev,
      wallColor: preset.wallColor,
      wallPattern: preset.wallPattern,
      floorType: preset.floorType,
    }));
    pushHistory(preset.items);
    setSelectedItemId(null);
  };

  // Count placed items by definition ID for catalog badges
  const placedCountMap = placedItems.reduce((acc, item) => {
    acc[item.itemId] = (acc[item.itemId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genderLabel =
    userProfile.gender === 'female'
      ? '여성'
      : userProfile.gender === 'male'
      ? '남성'
      : userProfile.gender === 'nonbinary'
      ? '논바이너리'
      : '비공개';

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-200 selection:text-amber-900">
      {/* 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-amber-900/10 shadow-2xs px-4 sm:px-8 py-3 flex items-center justify-between gap-6">
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-xl bg-amber-700 text-white flex items-center justify-center text-base shadow-xs">
            🏡
          </div>
          <span className="text-lg font-bold tracking-tight text-amber-950 font-serif">
            마이 코지 룸
          </span>
        </div>

        {/* Zone 2: Navigation Links & Room Metadata */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-600">
          {/* Room Name link */}
          <button
            onClick={() => {
              soundManager.playRotate();
              setIsProfileModalOpen(true);
            }}
            className="flex items-center gap-1.5 text-amber-950 hover:text-amber-800 font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="클릭하여 방 이름 변경"
          >
            <Home className="w-3.5 h-3.5 text-amber-700" />
            <span className="max-w-[180px] truncate">{userProfile.roomName}</span>
          </button>

          <span className="text-slate-300" aria-hidden="true">
            ·
          </span>

          {/* User Profile */}
          <button
            onClick={() => {
              soundManager.playRotate();
              setIsProfileModalOpen(true);
            }}
            className="flex items-center gap-1.5 hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="사용자 정보 및 아바타 수정"
          >
            <User className="w-3.5 h-3.5 text-amber-700" />
            <span>
              {userProfile.name} ({genderLabel})
            </span>
          </button>

          <span className="text-slate-300" aria-hidden="true">
            ·
          </span>

          <span className="text-slate-500 whitespace-nowrap shrink-0">
            배치된 가구 {placedItems.length}개
          </span>
        </nav>

        {/* Zone 3: Coins Balance, MiniGame CTA, & Profile Settings */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Coin Balance Pill with Quick Plus Button */}
          <button
            onClick={() => {
              soundManager.playSparkle();
              setIsMiniGameModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/90 hover:bg-amber-200 text-amber-950 border border-amber-300/80 transition-all font-mono font-bold text-xs cursor-pointer shadow-2xs group"
            title="클릭하여 미니게임으로 코인 벌기"
          >
            <Coins className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
            <span>{coins.toLocaleString()}</span>
            <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] ml-0.5">
              +
            </span>
          </button>

          {/* Mini-Game Arcade Button */}
          <button
            onClick={() => {
              soundManager.playSparkle();
              setIsMiniGameModalOpen(true);
            }}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-800 hover:bg-amber-900 active:bg-amber-950 text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">미니게임</span>
          </button>

          {/* Profile Setting Modal Button */}
          <button
            onClick={() => {
              soundManager.playRotate();
              setIsProfileModalOpen(true);
            }}
            className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            title="프로필 및 방 정보 수정"
          >
            <User className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">프로필</span>
          </button>
        </div>
      </header>

      {/* MAIN VIEWPORT LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col gap-5">
        {/* ROOM SETTINGS TOOLBAR */}
        <RoomSettingsBar
          settings={roomSettings}
          onUpdateSettings={(newSt) => setRoomSettings((prev) => ({ ...prev, ...newSt }))}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onResetRoom={handleResetRoom}
          onOpenPresets={() => setIsPresetsModalOpen(true)}
          onTakePhoto={() => setIsPhotoModalOpen(true)}
        />

        {/* INTERACTIVE 2.5D ROOM CANVAS */}
        <div className="relative w-full flex flex-col items-center">
          <RoomCanvas
            placedItems={placedItems}
            roomSettings={roomSettings}
            userProfile={userProfile}
            selectedItemId={selectedItemId}
            onSelectItem={setSelectedItemId}
            onUpdateItemPosition={handleUpdateItemPosition}
            avatarPos={avatarPos}
            onAvatarPosChange={(x, y) => setAvatarPos({ x, y })}
            canvasRef={canvasRef}
          />

          {/* FLOATING ITEM CONTROL GIZMO (Appears when item is selected) */}
          {selectedItem && (
            <div className="mt-3 w-full flex justify-center">
              <ItemControlGizmo
                selectedItem={selectedItem}
                itemDef={selectedItemDef}
                onRotate={handleRotateItem}
                onFlip={handleFlipItem}
                onDelete={handleDeleteItem}
                onDuplicate={handleDuplicateItem}
                onBringForward={handleBringForward}
                onSendBackward={handleSendBackward}
                onChangeColorVariant={handleChangeColorVariant}
                onScaleChange={handleScaleChange}
                onDeselect={() => setSelectedItemId(null)}
              />
            </div>
          )}
        </div>

        {/* FURNITURE & ACCESSORIES CATALOG DRAWER (With Coin Shopping & Minigame integration) */}
        <div className="w-full mt-2">
          <FurnitureCatalog
            onAddItem={handleAddItem}
            placedCountMap={placedCountMap}
            userCoins={coins}
            ownedItemIds={ownedItemIds}
            onBuyItem={handleBuyItem}
            onOpenMiniGame={() => setIsMiniGameModalOpen(true)}
          />
        </div>
      </main>

      {/* QUIET AESTHETIC FOOTER */}
      <footer className="mt-auto py-5 border-t border-amber-900/10 text-center text-xs text-amber-900/60 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>마이 코지 룸 (My Cozy Room) · 미니게임으로 코인을 모아 나만의 방을 꾸며보세요</span>
          <span>미니게임에서 '먼지 팡팡!'과 '가구 짝맞추기'를 즐길 수 있어요!</span>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. First-time or manual Profile & Room Name Setup Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        initialProfile={userProfile}
        isFirstTime={isFirstTime}
        onSave={(newProfile) => {
          setUserProfile(newProfile);
          setIsProfileModalOpen(false);
          setIsFirstTime(false);
        }}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* 2. Photo Mode Polaroid Modal */}
      <PhotoModeModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        userProfile={userProfile}
        roomSettings={roomSettings}
        placedItemsCount={placedItems.length}
        canvasElement={canvasRef.current}
      />

      {/* 3. Preset Rooms Modal */}
      <RoomPresetsModal
        isOpen={isPresetsModalOpen}
        onClose={() => setIsPresetsModalOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

      {/* 4. Mini-Game Arcade Modal */}
      <MiniGameModal
        isOpen={isMiniGameModalOpen}
        onClose={() => setIsMiniGameModalOpen(false)}
        onEarnCoins={handleEarnCoins}
        currentCoins={coins}
      />
    </div>
  );
}
