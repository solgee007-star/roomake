import React, { useRef, useState } from 'react';
import { PlacedItem, RoomSettings, UserProfile } from '../types/room';
import { FURNITURE_CATALOG, FLOOR_OPTIONS } from '../data/furnitureData';
import { FurnitureItemGraphic } from './FurnitureItemGraphic';
import { AvatarCharacter } from './AvatarCharacter';
import { soundManager } from '../utils/audio';

interface Props {
  placedItems: PlacedItem[];
  roomSettings: RoomSettings;
  userProfile: UserProfile;
  selectedItemId: string | null;
  onSelectItem: (id: string | null) => void;
  onUpdateItemPosition: (id: string, x: number, y: number) => void;
  avatarPos: { x: number; y: number };
  onAvatarPosChange: (x: number, y: number) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export const RoomCanvas: React.FC<Props> = ({
  placedItems,
  roomSettings,
  userProfile,
  selectedItemId,
  onSelectItem,
  onUpdateItemPosition,
  avatarPos,
  onAvatarPosChange,
  canvasRef,
}) => {
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Grid step
  const GRID_SIZE = roomSettings.gridSnap ? 20 : 1;

  // Handle pointer down on a placed furniture item
  const handleItemPointerDown = (e: React.PointerEvent, item: PlacedItem) => {
    e.stopPropagation();
    onSelectItem(item.instanceId);
    setDraggingItemId(item.instanceId);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const itemPxX = (item.x / 100) * rect.width;
    const itemPxY = (item.y / 100) * rect.height;

    setDragOffset({
      x: e.clientX - rect.left - itemPxX,
      y: e.clientY - rect.top - itemPxY,
    });

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingItemId || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();

    let rawPxX = e.clientX - rect.left - dragOffset.x;
    let rawPxY = e.clientY - rect.top - dragOffset.y;

    // Apply grid snap if enabled
    if (roomSettings.gridSnap) {
      rawPxX = Math.round(rawPxX / GRID_SIZE) * GRID_SIZE;
      rawPxY = Math.round(rawPxY / GRID_SIZE) * GRID_SIZE;
    }

    // Convert to percentage (clamped inside room boundary 2% to 94%)
    const pctX = Math.min(94, Math.max(2, (rawPxX / rect.width) * 100));
    const pctY = Math.min(92, Math.max(2, (rawPxY / rect.height) * 100));

    onUpdateItemPosition(draggingItemId, pctX, pctY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingItemId) {
      soundManager.playPlace();
      setDraggingItemId(null);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Sort items: rugs first, then natural Y-depth sorting + custom zIndex
  const sortedItems = [...placedItems].sort((a, b) => {
    const defA = FURNITURE_CATALOG.find((f) => f.id === a.itemId);
    const defB = FURNITURE_CATALOG.find((f) => f.id === b.itemId);

    if (defA?.isFloorRug && !defB?.isFloorRug) return -1;
    if (!defA?.isFloorRug && defB?.isFloorRug) return 1;

    // Wall items before high floor items
    if (defA?.isWallItem && !defB?.isWallItem) return -1;
    if (!defA?.isWallItem && defB?.isWallItem) return 1;

    if (a.zIndex !== b.zIndex) {
      return a.zIndex - b.zIndex;
    }
    return a.y - b.y;
  });

  const currentFloor =
    FLOOR_OPTIONS.find((f) => f.id === roomSettings.floorType) || FLOOR_OPTIONS[0];

  return (
    <div
      ref={canvasRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={() => onSelectItem(null)}
      className="relative w-full max-w-[940px] aspect-[4/3] sm:aspect-[16/11] bg-amber-50/40 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-900/20 select-none mx-auto"
      style={{
        touchAction: 'none',
      }}
    >
      {/* 2.5D Room Structure */}

      {/* WALL AREA (Top 52% of canvas) */}
      <div
        className="absolute top-0 left-0 right-0 h-[52%] transition-colors duration-500 overflow-hidden"
        style={{
          backgroundColor: roomSettings.wallColor,
        }}
      >
        {/* Wall Patterns */}
        {roomSettings.wallPattern === 'vertical-stripes' && (
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, #000, #000 24px, transparent 24px, transparent 48px)`,
            }}
          />
        )}
        {roomSettings.wallPattern === 'brick' && (
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, #8B3A2B 0, #8B3A2B 2px, transparent 2px, transparent 20px), repeating-linear-gradient(90deg, #8B3A2B 0, #8B3A2B 2px, transparent 2px, transparent 40px)`,
            }}
          />
        )}
        {roomSettings.wallPattern === 'cute-stars' && (
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #F39C12 2px, transparent 2px)`,
              backgroundSize: '36px 36px',
            }}
          />
        )}
        {roomSettings.wallPattern === 'classic-damask' && (
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(ellipse at center, #D4AF37 20%, transparent 20%), radial-gradient(ellipse at center, #D4AF37 10%, transparent 10%)`,
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 20px 20px',
            }}
          />
        )}
        {roomSettings.wallPattern === 'wood-panels' && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, #5C3D2E 0, #5C3D2E 2px, transparent 2px, transparent 16px)`,
            }}
          />
        )}
        {roomSettings.wallPattern === 'concrete' && (
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
              backgroundSize: '12px 12px',
            }}
          />
        )}
        {roomSettings.wallPattern === 'wainscoting' && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/30 border-t-2 border-black/15 shadow-inner">
            <div className="absolute inset-x-4 top-2 bottom-2 border border-black/10 rounded-sm opacity-60" />
          </div>
        )}

        {/* Isometric depth corners / shadows */}
        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />

        {/* Room Header Plate */}
        <div className="absolute top-4 left-6 z-20 pointer-events-none flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-amber-900/10">
          <span className="text-sm">🏡</span>
          <span className="text-xs font-bold text-amber-950 tracking-tight">
            {userProfile.roomName}
          </span>
          <span className="text-[10px] text-amber-800/60">· {userProfile.name}</span>
        </div>
      </div>

      {/* WALL / FLOOR BASEBOARD MOLDING */}
      <div className="absolute top-[52%] left-0 right-0 h-4 bg-amber-950/20 border-b border-amber-950/30 shadow-xs z-10 flex items-center">
        <div className="w-full h-1 bg-amber-900/30" />
      </div>

      {/* FLOOR AREA (Bottom 48% of canvas) */}
      <div
        className="absolute top-[52%] left-0 right-0 bottom-0 transition-colors duration-500 overflow-hidden"
        style={{
          backgroundColor: currentFloor.bg,
        }}
      >
        {/* Floor Plank / Pattern Texture */}
        {roomSettings.floorType === 'wood-warm' && (
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, #5A381E 0, #5A381E 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, #5A381E 0, #5A381E 1px, transparent 1px, transparent 120px)`,
            }}
          />
        )}
        {roomSettings.floorType === 'wood-dark' && (
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, #1A0E08 0, #1A0E08 2px, transparent 2px, transparent 28px), repeating-linear-gradient(90deg, #1A0E08 0, #1A0E08 1.5px, transparent 1.5px, transparent 140px)`,
            }}
          />
        )}
        {roomSettings.floorType === 'wood-herringbone' && (
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 28px), repeating-linear-gradient(-45deg, #000 0, #000 2px, transparent 2px, transparent 28px)`,
            }}
          />
        )}
        {roomSettings.floorType === 'tatami' && (
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, #333 0, #333 1.5px, transparent 1.5px, transparent 14px), repeating-linear-gradient(90deg, #2D4A3E 0, #2D4A3E 12px, transparent 12px, transparent 160px)`,
            }}
          />
        )}
        {roomSettings.floorType === 'concrete-tile' && (
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, #8C9BAE 0, #8C9BAE 2px, transparent 2px, transparent 48px), repeating-linear-gradient(90deg, #8C9BAE 0, #8C9BAE 2px, transparent 2px, transparent 48px)`,
            }}
          />
        )}
        {roomSettings.floorType === 'marble' && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(60deg, #B0BEC5 0, #B0BEC5 1px, transparent 1px, transparent 60px), repeating-linear-gradient(-30deg, #CFD8DC 0, #CFD8DC 1.5px, transparent 1.5px, transparent 80px)`,
            }}
          />
        )}
        {roomSettings.floorType === 'terrazzo' && (
          <div
            className="absolute inset-0 opacity-35 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #E76F51 2px, transparent 2px), radial-gradient(circle, #2A9D8F 2.5px, transparent 2.5px), radial-gradient(circle, #264653 2px, transparent 2px)`,
              backgroundSize: '24px 24px, 36px 36px, 48px 48px',
              backgroundPosition: '0 0, 12px 12px, 24px 24px',
            }}
          />
        )}
        {roomSettings.floorType === 'checkered' && (
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(45deg, ${currentFloor.secondary} 25%, transparent 25%), linear-gradient(-45deg, ${currentFloor.secondary} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${currentFloor.secondary} 75%), linear-gradient(-45deg, transparent 75%, ${currentFloor.secondary} 75%)`,
              backgroundSize: '40px 40px',
            }}
          />
        )}
        {roomSettings.floorType === 'carpet-cream' && (
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #9E8268 1.2px, transparent 1.2px)`,
              backgroundSize: '8px 8px',
            }}
          />
        )}

        {/* Floor Depth Ambient Shadow */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* OPTIONAL GRID GUIDES */}
      {roomSettings.showGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, #555 1.2px, transparent 1.2px)`,
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {/* PLACED FURNITURE ITEMS */}
      {sortedItems.map((item) => {
        const itemDef = FURNITURE_CATALOG.find((f) => f.id === item.itemId);
        if (!itemDef) return null;

        const isSelected = selectedItemId === item.instanceId;
        const isCurrentlyDragging = draggingItemId === item.instanceId;

        return (
          <div
            key={item.instanceId}
            onPointerDown={(e) => handleItemPointerDown(e, item)}
            className={`absolute cursor-move select-none transition-shadow ${
              isCurrentlyDragging ? 'scale-105 z-50' : ''
            }`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale})`,
              transformOrigin: 'center center',
              zIndex: isCurrentlyDragging ? 900 : item.zIndex,
            }}
          >
            {/* Selection highlight halo */}
            {isSelected && (
              <div
                className="absolute -inset-2.5 rounded-2xl border-2 border-dashed border-amber-600 bg-amber-500/10 pointer-events-none animate-pulse"
                style={{
                  transform: 'scale(1.02)',
                }}
              />
            )}

            {/* Furniture SVG Graphic */}
            <FurnitureItemGraphic
              itemDef={itemDef}
              colorVariantIndex={item.colorVariantIndex}
              isFlipped={item.flipped}
            />
          </div>
        );
      })}

      {/* USER AVATAR CHARACTER */}
      <AvatarCharacter
        profile={userProfile}
        x={avatarPos.x}
        y={avatarPos.y}
        onPositionChange={(newX, newY) => onAvatarPosChange(newX, newY)}
      />

      {/* TIME OF DAY ATMOSPHERIC LIGHTING OVERLAYS */}
      {roomSettings.timeOfDay === 'sunset' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/25 via-rose-500/15 to-orange-400/25 pointer-events-none mix-blend-multiply transition-opacity duration-700" />
      )}
      {roomSettings.timeOfDay === 'night' && (
        <div className="absolute inset-0 bg-[#0c1829]/55 pointer-events-none transition-opacity duration-700">
          {/* Subtle localized warm glow spots for placed lamps */}
          {placedItems
            .filter((item) => item.itemId.includes('lamp') || item.itemId.includes('candle') || item.itemId.includes('fairy'))
            .map((lamp) => (
              <div
                key={lamp.instanceId}
                className="absolute w-44 h-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/25 blur-xl pointer-events-none"
                style={{
                  left: `${lamp.x}%`,
                  top: `${lamp.y}%`,
                }}
              />
            ))}
        </div>
      )}

      {/* WEATHER PARTICLES */}
      {roomSettings.weather === 'rain' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          <div
            className="w-full h-full animate-rain"
            style={{
              backgroundImage: `repeating-linear-gradient(105deg, transparent, transparent 40px, rgba(140, 200, 255, 0.6) 41px, transparent 42px)`,
              backgroundSize: '120px 120px',
            }}
          />
        </div>
      )}
      {roomSettings.weather === 'petals' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
          {[15, 35, 55, 75, 90].map((left, idx) => (
            <div
              key={idx}
              className="absolute w-2.5 h-3.5 bg-pink-300 rounded-full animate-float-petal opacity-75"
              style={{
                left: `${left}%`,
                top: `${(idx * 20) % 80}%`,
                animationDelay: `${idx * 0.8}s`,
                animationDuration: `${3.5 + idx * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
      {roomSettings.weather === 'stars' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { x: 15, y: 12 },
            { x: 30, y: 8 },
            { x: 60, y: 15 },
            { x: 80, y: 10 },
            { x: 45, y: 22 },
          ].map((star, idx) => (
            <div
              key={idx}
              className="absolute text-yellow-200 text-xs animate-ping"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                animationDuration: `${2 + idx * 0.7}s`,
              }}
            >
              ✦
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
