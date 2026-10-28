import React, { useState } from 'react';
import { UserProfile } from '../types/room';

interface Props {
  profile: UserProfile;
  x: number;
  y: number;
  onPositionChange?: (x: number, y: number) => void;
  isDraggable?: boolean;
}

const EMOTE_LIST = ['☕', '💖', '🌿', '✨', '💤', '🎶', '📖'];

export const AvatarCharacter: React.FC<Props> = ({
  profile,
  x,
  y,
  onPositionChange,
  isDraggable = true,
}) => {
  const [currentEmote, setCurrentEmote] = useState<string>('✨');
  const [showEmotePicker, setShowEmotePicker] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const { avatar, gender, name } = profile;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isDraggable) return;
    e.stopPropagation();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y,
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !onPositionChange) return;
    onPositionChange(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const cycleEmote = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (EMOTE_LIST.indexOf(currentEmote) + 1) % EMOTE_LIST.length;
    setCurrentEmote(EMOTE_LIST[nextIdx]);
  };

  return (
    <div
      className="absolute select-none cursor-grab active:cursor-grabbing transition-transform duration-75"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        zIndex: 800,
        transform: 'translate(-50%, -75%)',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowEmotePicker(false);
      }}
    >
      {/* Speech / Reaction Bubble */}
      <div
        onClick={cycleEmote}
        title="클릭하여 감정 표현 변경"
        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/95 px-2.5 py-1 rounded-full shadow-md border border-amber-200/80 flex items-center gap-1 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
      >
        <span className="text-base animate-bounce">{currentEmote}</span>
        <span className="text-[10px] font-medium text-amber-900/80">{name}</span>
      </div>

      {/* Character SVG Body */}
      <svg
        width="68"
        height="100"
        viewBox="0 0 68 100"
        className="drop-shadow-md hover:scale-105 transition-transform"
      >
        {/* Ground shadow */}
        <ellipse cx="34" cy="94" rx="22" ry="5" fill="#000000" opacity="0.2" />

        {/* Legs / Shoes */}
        <line x1="27" y1="72" x2="27" y2="88" stroke="#333333" strokeWidth="6" strokeLinecap="round" />
        <line x1="41" y1="72" x2="41" y2="88" stroke="#333333" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="26" cy="90" rx="5" ry="3" fill="#6B4B38" />
        <ellipse cx="42" cy="90" rx="5" ry="3" fill="#6B4B38" />

        {/* Pants or Skirt */}
        {gender === 'female' ? (
          <polygon points="22,60 46,60 50,74 18,74" fill="#607D8B" stroke="#37474F" strokeWidth="1.5" />
        ) : (
          <g>
            <rect x="22" y="58" width="24" height="18" rx="2" fill="#455A64" stroke="#263238" strokeWidth="1.5" />
            <line x1="34" y1="64" x2="34" y2="76" stroke="#263238" strokeWidth="1.5" />
          </g>
        )}

        {/* Torso / Clothes */}
        <rect
          x="20"
          y="40"
          width="28"
          height="24"
          rx="6"
          fill={avatar.shirtColor || '#FF7675'}
          stroke="#442211"
          strokeWidth="1.8"
        />
        {/* Collar / Scarf */}
        <path d="M 28 40 L 34 46 L 40 40" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Arms */}
        <path d="M 21 44 Q 14 54 20 62" stroke={avatar.shirtColor || '#FF7675'} strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="20" cy="62" r="3.5" fill={avatar.skinTone || '#FFDFC4'} />
        <path d="M 47 44 Q 54 54 48 62" stroke={avatar.shirtColor || '#FF7675'} strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="48" cy="62" r="3.5" fill={avatar.skinTone || '#FFDFC4'} />

        {/* Head */}
        <circle
          cx="34"
          cy="26"
          r="16"
          fill={avatar.skinTone || '#FFDFC4'}
          stroke="#68472B"
          strokeWidth="1.8"
        />

        {/* Cheeks */}
        <circle cx="23" cy="28" r="3" fill="#FF8A80" opacity="0.6" />
        <circle cx="45" cy="28" r="3" fill="#FF8A80" opacity="0.6" />

        {/* Expression */}
        {avatar.expression === 'wink' ? (
          <g>
            <circle cx="26" cy="24" r="2" fill="#2C3E50" />
            <path d="M 40 24 Q 43 21 46 24" stroke="#2C3E50" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 32 30 Q 34 33 36 30" stroke="#E74C3C" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        ) : avatar.expression === 'sleepy' ? (
          <g>
            <path d="M 23 24 Q 26 27 29 24" stroke="#2C3E50" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 39 24 Q 42 27 45 24" stroke="#2C3E50" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="34" cy="30" r="2.5" fill="#E74C3C" />
          </g>
        ) : (
          <g>
            {/* Happy smiling eyes */}
            <circle cx="26" cy="24" r="2.2" fill="#2C3E50" />
            <circle cx="42" cy="24" r="2.2" fill="#2C3E50" />
            <circle cx="27" cy="23" r="0.8" fill="#FFFFFF" />
            <circle cx="43" cy="23" r="0.8" fill="#FFFFFF" />
            <path d="M 30 30 Q 34 35 38 30" stroke="#D32F2F" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* Hair Styles */}
        {avatar.hairStyle === 'long' || (gender === 'female' && avatar.hairStyle !== 'short') ? (
          <g>
            {/* Long flowing hair */}
            <path
              d="M 18 24 C 16 10, 52 10, 50 24 C 54 36, 52 48, 50 56 C 48 56, 44 44, 46 30 C 44 20, 24 20, 22 30 C 24 44, 20 56, 18 56 C 16 48, 14 36, 18 24 Z"
              fill={avatar.hairColor || '#4A3425'}
            />
            {/* Front bangs */}
            <path d="M 20 18 Q 34 10 48 18 Q 34 22 20 18 Z" fill={avatar.hairColor || '#4A3425'} />
            {/* Cute hairpin / ribbon */}
            <circle cx="46" cy="18" r="3.5" fill="#FF4757" />
            <circle cx="46" cy="18" r="1.5" fill="#FFFFFF" />
          </g>
        ) : avatar.hairStyle === 'curly' ? (
          <g>
            <circle cx="20" cy="16" r="8" fill={avatar.hairColor || '#2F3542'} />
            <circle cx="34" cy="12" r="9" fill={avatar.hairColor || '#2F3542'} />
            <circle cx="48" cy="16" r="8" fill={avatar.hairColor || '#2F3542'} />
            <circle cx="16" cy="24" r="6" fill={avatar.hairColor || '#2F3542'} />
            <circle cx="52" cy="24" r="6" fill={avatar.hairColor || '#2F3542'} />
          </g>
        ) : (
          /* Short / Neat hair */
          <g>
            <path
              d="M 17 26 C 17 12, 51 12, 51 26 C 51 24, 46 16, 34 16 C 22 16, 17 24, 17 26 Z"
              fill={avatar.hairColor || '#333333'}
            />
            <path d="M 18 22 Q 34 14 50 20 Q 34 25 18 22 Z" fill={avatar.hairColor || '#333333'} />
          </g>
        )}
      </svg>
    </div>
  );
};
