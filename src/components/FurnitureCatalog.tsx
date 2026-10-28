import React, { useState } from 'react';
import { ItemCategory, FurnitureDefinition, FurnitureStyle } from '../types/room';
import { FURNITURE_CATALOG, CATEGORY_LABELS, FURNITURE_STYLES } from '../data/furnitureData';
import { FurnitureItemGraphic } from './FurnitureItemGraphic';
import { soundManager } from '../utils/audio';
import {
  Search,
  Plus,
  Sparkles,
  Bed,
  Armchair,
  FolderOpen,
  Lamp,
  Flower2,
  Tv,
  Palette,
  Heart,
  X,
  Coins,
  Lock,
  CheckCircle2,
  Gamepad2,
  ShoppingBag,
} from 'lucide-react';

interface Props {
  onAddItem: (itemDef: FurnitureDefinition) => void;
  placedCountMap: Record<string, number>;
  userCoins: number;
  ownedItemIds: string[];
  onBuyItem: (itemDef: FurnitureDefinition) => boolean;
  onOpenMiniGame: () => void;
}

export const FurnitureCatalog: React.FC<Props> = ({
  onAddItem,
  placedCountMap,
  userCoins,
  ownedItemIds,
  onBuyItem,
  onOpenMiniGame,
}) => {
  const [activeCategory, setActiveCategory] = useState<ItemCategory | 'all'>('all');
  const [activeStyle, setActiveStyle] = useState<FurnitureStyle | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOwnedOnly, setFilterOwnedOnly] = useState<boolean>(false);

  // Filtered items
  const filteredItems = FURNITURE_CATALOG.filter((item) => {
    const isOwned = ownedItemIds.includes(item.id);
    if (filterOwnedOnly && !isOwned) return false;

    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesStyle =
      activeStyle === 'all' || item.style === activeStyle;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.koreanName.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesStyle && matchesSearch;
  });

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'bed':
        return <Bed className="w-3.5 h-3.5" />;
      case 'seating':
        return <Armchair className="w-3.5 h-3.5" />;
      case 'table':
        return <FolderOpen className="w-3.5 h-3.5" />;
      case 'storage':
        return <FolderOpen className="w-3.5 h-3.5" />;
      case 'lighting':
        return <Lamp className="w-3.5 h-3.5" />;
      case 'plant':
        return <Flower2 className="w-3.5 h-3.5" />;
      case 'tech':
        return <Tv className="w-3.5 h-3.5" />;
      case 'decor':
        return <Palette className="w-3.5 h-3.5" />;
      case 'pet':
        return <Heart className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const getStyleBadge = (style: FurnitureStyle) => {
    switch (style) {
      case 'modern':
        return { label: '모던', color: 'bg-slate-100 text-slate-800 border-slate-300' };
      case 'classic':
        return { label: '클래식', color: 'bg-amber-100/90 text-amber-900 border-amber-300' };
      case 'minimalist':
        return { label: '미니멀', color: 'bg-emerald-50 text-emerald-800 border-emerald-300' };
      case 'pastel':
        return { label: '파스텔', color: 'bg-pink-100 text-pink-800 border-pink-300' };
      default:
        return { label: '코지', color: 'bg-orange-50 text-orange-800 border-orange-200' };
    }
  };

  const handleCardClick = (item: FurnitureDefinition) => {
    const isOwned = ownedItemIds.includes(item.id);
    if (isOwned) {
      soundManager.playPlace();
      onAddItem(item);
    } else {
      // Prompt purchase
      handleBuyClick(item);
    }
  };

  const handleBuyClick = (item: FurnitureDefinition) => {
    if (userCoins < item.price) {
      soundManager.playRotate();
      if (confirm(`코인이 부족합니다! (필요: ${item.price} 코인 / 보유: ${userCoins} 코인)\n미니게임을 플레이해서 코인을 모으시겠습니까?`)) {
        onOpenMiniGame();
      }
      return;
    }

    const confirmed = confirm(`[${item.koreanName}] 가구를 ${item.price} 코인에 구매하시겠습니까?`);
    if (confirmed) {
      const success = onBuyItem(item);
      if (success) {
        soundManager.playSparkle();
      }
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-lg border border-amber-900/10 flex flex-col h-full max-h-[640px]">
      {/* Top Search & Coins & Minigame Shortcut Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-700" />
              <span>가구 상점 & 보물창고</span>
              <span className="text-xs font-normal text-amber-800/70">
                ({filteredItems.length}개 가구)
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              미니게임으로 번 코인으로 가구를 구매하고, 보유한 가구를 방에 자유롭게 배치하세요!
            </p>
          </div>
        </div>

        {/* Right Tools: Coin Status & MiniGame Shortcut & Search */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* User Coins Display */}
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-300 font-mono font-bold text-xs text-amber-950">
            <Coins className="w-4 h-4 text-amber-600" />
            <span>{userCoins.toLocaleString()} 코인</span>
          </div>

          {/* Quick MiniGame CTA Button */}
          <button
            onClick={onOpenMiniGame}
            className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
            <span>코인 모으기 미니게임</span>
          </button>

          {/* Search input */}
          <div className="relative min-w-[170px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="가구 검색..."
              className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Row 1: Style Collection Filter Tabs & Owned Toggle */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none mb-2 border-b border-amber-900/10">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-amber-950 whitespace-nowrap mr-1">
            스타일:
          </span>
          {FURNITURE_STYLES.map((st) => {
            const isActive = activeStyle === st.id;
            return (
              <button
                key={st.id}
                onClick={() => {
                  setActiveStyle(st.id);
                  soundManager.playRotate();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-amber-50/80 hover:bg-amber-100/70 text-amber-900 border border-amber-900/10'
                }`}
              >
                <span>{st.icon}</span>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>

        {/* Owned Filter Switch */}
        <button
          onClick={() => {
            soundManager.playRotate();
            setFilterOwnedOnly(!filterOwnedOnly);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer shrink-0 ${
            filterOwnedOnly
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
              : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>보유한 가구만 보기 ({ownedItemIds.length})</span>
        </button>
      </div>

      {/* Row 2: Category Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
        <span className="text-[11px] font-bold text-amber-950 whitespace-nowrap mr-1">
          종류:
        </span>
        {CATEGORY_LABELS.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                soundManager.playRotate();
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-700 text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Item Grid */}
      <div className="flex-1 overflow-y-auto pr-1">
        {filteredItems.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center text-slate-400 text-xs">
            <span className="text-3xl mb-2">🔍</span>
            <p>조건에 맞는 가구가 없어요.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setActiveStyle('all');
                setFilterOwnedOnly(false);
              }}
              className="mt-2 text-amber-700 underline font-medium"
            >
              전체 목록 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredItems.map((item) => {
              const placedCount = placedCountMap[item.id] || 0;
              const isOwned = ownedItemIds.includes(item.id);
              const badge = getStyleBadge(item.style);
              const canAfford = userCoins >= item.price;

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className={`group relative border rounded-2xl p-3 flex flex-col items-center justify-between text-center cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 ${
                    isOwned
                      ? 'bg-[#FAF7F2] hover:bg-[#F5EFE6] border-amber-900/10 hover:border-amber-600/40'
                      : 'bg-white hover:bg-amber-50/40 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  {/* Style tag & Ownership / Placed status badge */}
                  <div className="w-full flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${badge.color}`}>
                      {badge.label}
                    </span>

                    {isOwned ? (
                      placedCount > 0 ? (
                        <span className="bg-amber-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-2xs">
                          배치됨 {placedCount}개
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          보유중
                        </span>
                      )
                    ) : (
                      <span className="flex items-center gap-1 font-mono font-bold text-[11px] text-amber-950 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                        <Coins className="w-3 h-3 text-amber-600" />
                        <span>{item.price}</span>
                      </span>
                    )}
                  </div>

                  {/* Graphic preview container */}
                  <div className="w-full h-24 flex items-center justify-center p-1 overflow-hidden transition-transform group-hover:scale-105 relative">
                    <div
                      style={{
                        transform: `scale(${Math.min(
                          1,
                          70 / Math.max(item.width, item.height)
                        )})`,
                        transformOrigin: 'center center',
                      }}
                    >
                      <FurnitureItemGraphic itemDef={item} />
                    </div>

                    {/* Lock Overlay if unowned */}
                    {!isOwned && (
                      <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-slate-900/50 text-white flex items-center justify-center">
                        <Lock className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {/* Item Info */}
                  <div className="w-full mt-2">
                    <div className="text-xs font-bold text-amber-950 truncate">
                      {item.koreanName}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {item.description}
                    </div>

                    {/* Color dot previews (if any) */}
                    {item.colorOptions && item.colorOptions.length > 0 && (
                      <div className="flex items-center justify-center gap-1 mt-1.5">
                        {item.colorOptions.slice(0, 4).map((c) => (
                          <span
                            key={c.name}
                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button: Place vs Buy */}
                  {isOwned ? (
                    <div className="w-full mt-2.5 py-1 px-2 bg-white/90 group-hover:bg-amber-700 group-hover:text-white text-amber-900 rounded-xl text-[11px] font-bold border border-amber-900/10 transition-colors flex items-center justify-center gap-1">
                      <Plus className="w-3 h-3" />
                      <span>방에 배치하기</span>
                    </div>
                  ) : (
                    <div
                      className={`w-full mt-2.5 py-1 px-2 rounded-xl text-[11px] font-bold border transition-colors flex items-center justify-center gap-1 ${
                        canAfford
                          ? 'bg-amber-100/80 group-hover:bg-amber-700 group-hover:text-white text-amber-950 border-amber-300'
                          : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                    >
                      <Coins className="w-3 h-3 text-amber-600 group-hover:text-white" />
                      <span>{canAfford ? `구매 (${item.price} 코인)` : '코인 부족'}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
