import React, { useState } from 'react';
import { UserProfile, Gender } from '../types/room';
import { PRESET_ROOM_NAMES } from '../data/furnitureData';
import { soundManager } from '../utils/audio';
import { Sparkles, User, Home, Palette, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  initialProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onClose?: () => void;
  isFirstTime?: boolean;
}

const SKIN_TONES = ['#FFDFC4', '#F0CBB0', '#E5B895', '#D29B71', '#8D5524'];
const HAIR_COLORS = ['#2D231E', '#5D4037', '#8D6E63', '#D4A373', '#E67E22', '#2C3E50'];
const SHIRT_COLORS = ['#FF7675', '#74B9FF', '#55EFC4', '#FFEAA7', '#A29BFE', '#FAB1A0', '#636E72'];

export const ProfileModal: React.FC<Props> = ({
  isOpen,
  initialProfile,
  onSave,
  onClose,
  isFirstTime = false,
}) => {
  const [name, setName] = useState(initialProfile.name || '루나');
  const [gender, setGender] = useState<Gender>(initialProfile.gender || 'female');
  const [roomName, setRoomName] = useState(initialProfile.roomName || '햇살 머무는 아늑한 다락방');
  const [avatar, setAvatar] = useState(initialProfile.avatar);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    soundManager.playSparkle();
    onSave({
      name: name.trim(),
      gender,
      roomName: roomName.trim() || `${name}의 아늑한 방`,
      avatar,
    });
  };

  const pickPresetRoom = (preset: string) => {
    setRoomName(preset);
    soundManager.playRotate();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-amber-900/10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl shadow-inner">
              🏡
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {isFirstTime ? '나만의 아늑한 방 만들기' : '프로필 & 방 설정'}
              </h2>
              <p className="text-xs text-amber-200/90">
                {isFirstTime ? '이름과 성별, 방의 이름을 정해주세요!' : '이름과 아바타 스타일을 언제든 바꿀 수 있어요'}
              </p>
            </div>
          </div>
          {!isFirstTime && onClose && (
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-sm px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              닫기
            </button>
          )}
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-slate-800">
          {/* User Name & Gender */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-amber-900 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-700" />
                사용자 이름 (닉네임)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={12}
                placeholder="이름을 입력하세요 (예: 지우, 별이)"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-amber-900/15 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm font-medium transition-all"
              />
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-xs font-semibold text-amber-900 mb-1.5">성별 선택</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'female', label: '여성', emoji: '👧' },
                  { id: 'male', label: '남성', emoji: '👦' },
                  { id: 'nonbinary', label: '논바이너리', emoji: '🧑' },
                  { id: 'unspecified', label: '선택 안함', emoji: '✨' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      setGender(item.id as Gender);
                      soundManager.playRotate();
                    }}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                      gender === item.id
                        ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-xs'
                        : 'bg-white border-amber-900/10 text-slate-600 hover:bg-amber-50/50'
                    }`}
                  >
                    <span className="text-lg mb-0.5">{item.emoji}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Room Name */}
            <div>
              <label className="block text-xs font-semibold text-amber-900 mb-1.5 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-amber-700" />
                방 이름 (Room Name)
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                maxLength={25}
                placeholder="예: 햇살 머무는 아늑한 다락방"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-amber-900/15 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm font-medium transition-all"
              />

              {/* Preset suggestions */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PRESET_ROOM_NAMES.slice(0, 4).map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => pickPresetRoom(preset)}
                    className="text-[11px] px-2.5 py-1 bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200/60 rounded-full transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-amber-900/10" />

          {/* Avatar Customization Preview & Controls */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-700" />
                나를 닮은 아바타 캐릭터 꾸미기
              </label>
              <span className="text-[11px] text-amber-700">방 안에 함께 등장해요!</span>
            </div>

            <div className="flex items-center gap-6 bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs">
              {/* Live Preview Box */}
              <div className="w-24 h-28 bg-amber-50/70 rounded-xl border border-amber-200 flex flex-col items-center justify-center shrink-0 relative overflow-hidden">
                <div className="text-[10px] text-amber-800/80 mb-1 font-medium">{name || '캐릭터'}</div>
                <svg width="48" height="68" viewBox="0 0 68 100">
                  {/* Torso */}
                  <rect x="20" y="44" width="28" height="24" rx="6" fill={avatar.shirtColor} stroke="#442211" strokeWidth="1.8" />
                  {/* Head */}
                  <circle cx="34" cy="26" r="16" fill={avatar.skinTone} stroke="#68472B" strokeWidth="1.8" />
                  <circle cx="23" cy="28" r="3" fill="#FF8A80" opacity="0.6" />
                  <circle cx="45" cy="28" r="3" fill="#FF8A80" opacity="0.6" />
                  <circle cx="26" cy="24" r="2.2" fill="#2C3E50" />
                  <circle cx="42" cy="24" r="2.2" fill="#2C3E50" />
                  <path d="M 30 30 Q 34 35 38 30" stroke="#D32F2F" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Hair */}
                  {avatar.hairStyle === 'long' || (gender === 'female' && avatar.hairStyle !== 'short') ? (
                    <path
                      d="M 18 24 C 16 10, 52 10, 50 24 C 54 36, 52 48, 50 56 C 48 56, 44 44, 46 30 C 44 20, 24 20, 22 30 C 24 44, 20 56, 18 56 Z"
                      fill={avatar.hairColor}
                    />
                  ) : (
                    <path
                      d="M 17 26 C 17 12, 51 12, 51 26 C 51 24, 46 16, 34 16 C 22 16, 17 24, 17 26 Z"
                      fill={avatar.hairColor}
                    />
                  )}
                </svg>
              </div>

              {/* Customization Options */}
              <div className="flex-1 space-y-3 text-xs">
                {/* Hair Style */}
                <div>
                  <span className="block text-[11px] font-medium text-slate-500 mb-1">헤어 스타일</span>
                  <div className="flex gap-2">
                    {[
                      { id: 'short', label: '단발 / 숏컷' },
                      { id: 'long', label: '긴 머리' },
                      { id: 'curly', label: '웨이브' },
                    ].map((style) => (
                      <button
                        type="button"
                        key={style.id}
                        onClick={() => setAvatar({ ...avatar, hairStyle: style.id })}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                          avatar.hairStyle === style.id
                            ? 'bg-amber-100 border-amber-600 text-amber-900'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair Color */}
                <div>
                  <span className="block text-[11px] font-medium text-slate-500 mb-1">헤어 컬러</span>
                  <div className="flex gap-2">
                    {HAIR_COLORS.map((color) => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setAvatar({ ...avatar, hairColor: color })}
                        className="w-5 h-5 rounded-full border border-black/20 flex items-center justify-center transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                      >
                        {avatar.hairColor === color && <Check className="w-3 h-3 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shirt Color */}
                <div>
                  <span className="block text-[11px] font-medium text-slate-500 mb-1">옷 컬러</span>
                  <div className="flex gap-2">
                    {SHIRT_COLORS.map((color) => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setAvatar({ ...avatar, shirtColor: color })}
                        className="w-5 h-5 rounded-full border border-black/20 flex items-center justify-center transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                      >
                        {avatar.shirtColor === color && <Check className="w-3 h-3 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isFirstTime ? '내 방 꾸미러 가기 ✨' : '설정 저장하고 돌아가기'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
