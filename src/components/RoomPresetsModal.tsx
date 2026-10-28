import React from 'react';
import { PlacedItem, WallPattern, FloorType } from '../types/room';
import { soundManager } from '../utils/audio';
import { Sparkles, X } from 'lucide-react';

export interface PresetDefinition {
  id: string;
  title: string;
  categoryStyle: string;
  description: string;
  emoji: string;
  wallColor: string;
  wallPattern: WallPattern;
  floorType: FloorType;
  items: PlacedItem[];
}

export const PRESET_ROOMS: PresetDefinition[] = [
  {
    id: 'modern-urban-loft',
    title: '모던 어반 스튜디오',
    categoryStyle: '모던 컬렉션',
    description: '플랫폼 침대, 스틸 데스크, 라운지 체어와 추상 오브제가 있는 도회적 공간',
    emoji: '🏙️',
    wallColor: '#FFFFFF',
    wallPattern: 'concrete',
    floorType: 'concrete-tile',
    items: [
      {
        instanceId: 'm-bed-1',
        itemId: 'bed-modern-platform',
        x: 26,
        y: 62,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 40,
      },
      {
        instanceId: 'm-lamp-1',
        itemId: 'lamp-modern-linear',
        x: 10,
        y: 44,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 50,
      },
      {
        instanceId: 'm-art-1',
        itemId: 'decor-wall-gallery-art',
        x: 32,
        y: 20,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 10,
      },
      {
        instanceId: 'm-chair-1',
        itemId: 'chair-modern-lounge',
        x: 64,
        y: 68,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 60,
      },
      {
        instanceId: 'm-sculpt-1',
        itemId: 'decor-modern-sculpture',
        x: 88,
        y: 50,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 55,
      },
      {
        instanceId: 'm-console-1',
        itemId: 'storage-modern-floating',
        x: 72,
        y: 30,
        rotation: 0,
        flipped: false,
        scale: 0.95,
        colorVariantIndex: 0,
        zIndex: 20,
      },
    ],
  },
  {
    id: 'classic-victorian-mansion',
    title: '빅토리아 로열 앤틱 서재',
    categoryStyle: '클래식 컬렉션',
    description: '황동 샹들리에와 마호가니 책상, 체스터필드 윙체어와 축음기가 있는 기품 있는 방',
    emoji: '👑',
    wallColor: '#264638',
    wallPattern: 'wainscoting',
    floorType: 'wood-herringbone',
    items: [
      {
        instanceId: 'c-ch-1',
        itemId: 'lamp-classic-chandelier',
        x: 50,
        y: 20,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 25,
      },
      {
        instanceId: 'c-painting-1',
        itemId: 'decor-classic-oilpainting',
        x: 22,
        y: 22,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 15,
      },
      {
        instanceId: 'c-desk-1',
        itemId: 'desk-classic-mahogany',
        x: 32,
        y: 62,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 45,
      },
      {
        instanceId: 'c-rug-1',
        itemId: 'rug-vintage-pattern',
        x: 55,
        y: 72,
        rotation: 0,
        flipped: false,
        scale: 1.1,
        colorVariantIndex: 0,
        zIndex: 2,
      },
      {
        instanceId: 'c-chair-1',
        itemId: 'chair-classic-chesterfield',
        x: 70,
        y: 65,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 55,
      },
      {
        instanceId: 'c-gramo-1',
        itemId: 'decor-classic-gramophone',
        x: 88,
        y: 54,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 60,
      },
    ],
  },
  {
    id: 'scandinavian-minimal-room',
    title: '스칸디나비안 미니멀 룸',
    categoryStyle: '미니멀 컬렉션',
    description: '단정한 로우 우드 침대, 벤트우드 체어, 페이퍼 펜던트와 아치 화병의 조화',
    emoji: '⚪',
    wallColor: '#E2EBE2',
    wallPattern: 'vertical-stripes',
    floorType: 'wood-warm',
    items: [
      {
        instanceId: 'min-pend-1',
        itemId: 'lamp-minimal-pendant',
        x: 76,
        y: 22,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 20,
      },
      {
        instanceId: 'min-bed-1',
        itemId: 'bed-minimal-tatami-wood',
        x: 28,
        y: 64,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 40,
      },
      {
        instanceId: 'min-rug-1',
        itemId: 'rug-minimal-grid',
        x: 55,
        y: 74,
        rotation: 0,
        flipped: false,
        scale: 1.1,
        colorVariantIndex: 0,
        zIndex: 2,
      },
      {
        instanceId: 'min-desk-1',
        itemId: 'desk-minimal-birch',
        x: 76,
        y: 58,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 45,
      },
      {
        instanceId: 'min-chair-1',
        itemId: 'chair-minimal-bentwood',
        x: 76,
        y: 74,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 60,
      },
      {
        instanceId: 'min-vase-1',
        itemId: 'decor-minimal-vase',
        x: 14,
        y: 56,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 50,
      },
    ],
  },
  {
    id: 'cute-pastel-fairytale',
    title: '러블리 핑크 파스텔 룸',
    categoryStyle: '파스텔 컬렉션',
    description: '구름 침대, 하트 화장대, 조개 쉘 의자, 튤립 조명과 곰인형이 가득한 방',
    emoji: '🎀',
    wallColor: '#FBE8E8',
    wallPattern: 'cute-stars',
    floorType: 'carpet-cream',
    items: [
      {
        instanceId: 'pas-bed-1',
        itemId: 'bed-pastel-cloud',
        x: 28,
        y: 62,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 40,
      },
      {
        instanceId: 'pas-vanity-1',
        itemId: 'desk-pastel-vanity',
        x: 72,
        y: 56,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 45,
      },
      {
        instanceId: 'pas-chair-1',
        itemId: 'chair-pastel-shell',
        x: 72,
        y: 74,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 60,
      },
      {
        instanceId: 'pas-tulip-1',
        itemId: 'lamp-pastel-tulip',
        x: 12,
        y: 52,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 50,
      },
      {
        instanceId: 'pas-bear-1',
        itemId: 'decor-pastel-bear',
        x: 52,
        y: 72,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 65,
      },
    ],
  },
  {
    id: 'cozy-loft-natural',
    title: '포근한 햇살 다락방',
    categoryStyle: '코지 컬렉션',
    description: '따스한 원목 가구와 싱글 베드, 창문과 귀여운 고양이가 있는 평화로운 쉼터',
    emoji: '☀️',
    wallColor: '#FBF7EE',
    wallPattern: 'solid',
    floorType: 'wood-warm',
    items: [
      {
        instanceId: 'p-win-1',
        itemId: 'window-sunny-curtain',
        x: 48,
        y: 26,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 10,
      },
      {
        instanceId: 'p-bed-1',
        itemId: 'bed-cozy-single',
        x: 22,
        y: 65,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 50,
      },
      {
        instanceId: 'p-rug-1',
        itemId: 'rug-round-fluffy',
        x: 52,
        y: 72,
        rotation: 0,
        flipped: false,
        scale: 1.1,
        colorVariantIndex: 0,
        zIndex: 2,
      },
      {
        instanceId: 'p-plant-1',
        itemId: 'plant-monstera-pot',
        x: 88,
        y: 60,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 60,
      },
      {
        instanceId: 'p-lamp-1',
        itemId: 'lamp-floor-stand',
        x: 12,
        y: 42,
        rotation: 0,
        flipped: false,
        scale: 0.95,
        colorVariantIndex: 0,
        zIndex: 40,
      },
      {
        instanceId: 'p-pet-1',
        itemId: 'pet-sleeping-cat',
        x: 52,
        y: 70,
        rotation: 0,
        flipped: false,
        scale: 1,
        colorVariantIndex: 0,
        zIndex: 70,
      },
    ],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PresetDefinition) => void;
}

export const RoomPresetsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-amber-900/15 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-amber-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base">테마별 추천 인테리어 룸</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Cards List */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-slate-600">
            모던, 클래식, 미니멀, 파스텔, 코지 테마를 선택하면 배경과 세트 가구들이 조화롭게 배치됩니다!
          </p>

          <div className="space-y-3">
            {PRESET_ROOMS.map((preset) => (
              <div
                key={preset.id}
                onClick={() => {
                  soundManager.playSparkle();
                  onSelectPreset(preset);
                  onClose();
                }}
                className="group bg-white p-4 rounded-2xl border border-amber-900/10 hover:border-amber-600 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
                    {preset.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-amber-950 group-hover:text-amber-800 transition-colors">
                        {preset.title}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-900 border border-amber-200">
                        {preset.categoryStyle}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{preset.description}</p>
                    <div className="text-[11px] text-amber-800/70 mt-1 font-medium">
                      가구 {preset.items.length}개 세팅 완료
                    </div>
                  </div>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-amber-50 group-hover:bg-amber-700 group-hover:text-white text-amber-900 text-xs font-bold border border-amber-200 transition-colors shrink-0">
                  불러오기
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
