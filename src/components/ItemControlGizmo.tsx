import React from 'react';
import { PlacedItem, FurnitureDefinition } from '../types/room';
import {
  RotateCw,
  FlipHorizontal,
  Trash2,
  Copy,
  Layers,
  ArrowUp,
  ArrowDown,
  Palette,
  ZoomIn,
  ZoomOut,
  X,
} from 'lucide-react';

interface Props {
  selectedItem: PlacedItem | null;
  itemDef?: FurnitureDefinition;
  onRotate: () => void;
  onFlip: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onChangeColorVariant: (index: number) => void;
  onScaleChange: (scale: number) => void;
  onDeselect: () => void;
}

export const ItemControlGizmo: React.FC<Props> = ({
  selectedItem,
  itemDef,
  onRotate,
  onFlip,
  onDelete,
  onDuplicate,
  onBringForward,
  onSendBackward,
  onChangeColorVariant,
  onScaleChange,
  onDeselect,
}) => {
  if (!selectedItem || !itemDef) return null;

  return (
    <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-amber-900/15 flex flex-wrap items-center gap-3 animate-fade-in text-slate-700 select-none max-w-full">
      {/* Item info */}
      <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
        <span className="text-xs font-bold text-amber-950 truncate max-w-[120px]">
          {itemDef.koreanName}
        </span>
        <button
          onClick={onDeselect}
          className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"
          title="선택 해제"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Rotation & Flip */}
      <div className="flex items-center gap-1">
        <button
          onClick={onRotate}
          className="p-2 hover:bg-amber-50 active:bg-amber-100 text-amber-900 rounded-xl transition-colors flex items-center gap-1 text-xs font-medium"
          title="90도 회전"
        >
          <RotateCw className="w-4 h-4" />
          <span className="hidden sm:inline">회전</span>
        </button>

        <button
          onClick={onFlip}
          className="p-2 hover:bg-amber-50 active:bg-amber-100 text-amber-900 rounded-xl transition-colors flex items-center gap-1 text-xs font-medium"
          title="좌우 반전"
        >
          <FlipHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">반전</span>
        </button>
      </div>

      {/* Scale adjustment */}
      <div className="flex items-center gap-1 px-2 border-x border-slate-200">
        <button
          onClick={() => onScaleChange(Math.max(0.7, selectedItem.scale - 0.1))}
          disabled={selectedItem.scale <= 0.75}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 disabled:opacity-40"
          title="축소"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="text-[11px] font-mono text-slate-600 w-8 text-center">
          {Math.round(selectedItem.scale * 100)}%
        </span>
        <button
          onClick={() => onScaleChange(Math.min(1.4, selectedItem.scale + 0.1))}
          disabled={selectedItem.scale >= 1.35}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 disabled:opacity-40"
          title="확대"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Color Variants (if any) */}
      {itemDef.colorOptions && itemDef.colorOptions.length > 0 && (
        <div className="flex items-center gap-1.5 pr-2 border-r border-slate-200">
          <Palette className="w-3.5 h-3.5 text-slate-400 mr-0.5" />
          {itemDef.colorOptions.map((opt, idx) => (
            <button
              key={opt.name}
              onClick={() => onChangeColorVariant(idx)}
              className={`w-5 h-5 rounded-full border transition-transform hover:scale-110 ${
                selectedItem.colorVariantIndex === idx
                  ? 'ring-2 ring-amber-600 ring-offset-1 scale-110 border-white'
                  : 'border-slate-300'
              }`}
              style={{ backgroundColor: opt.hex }}
              title={opt.name}
            />
          ))}
        </div>
      )}

      {/* Layering Z-index */}
      <div className="flex items-center gap-1">
        <button
          onClick={onBringForward}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
          title="앞으로 가져오기"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onSendBackward}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
          title="뒤로 보내기"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Duplicate & Delete */}
      <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
        <button
          onClick={onDuplicate}
          className="p-2 hover:bg-amber-50 text-amber-800 rounded-xl transition-colors"
          title="가구 복제"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 hover:bg-red-50 text-red-600 rounded-xl transition-colors"
          title="삭제"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
