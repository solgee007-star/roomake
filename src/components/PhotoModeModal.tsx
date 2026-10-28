import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, RoomSettings, PlacedItem } from '../types/room';
import { soundManager } from '../utils/audio';
import { Download, X, Heart, Sparkles, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  roomSettings: RoomSettings;
  placedItemsCount: number;
  canvasElement: HTMLDivElement | null;
}

export const PhotoModeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userProfile,
  roomSettings,
  placedItemsCount,
  canvasElement,
}) => {
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [selectedStamp, setSelectedStamp] = useState<string>('🌸');
  const [customNote, setCustomNote] = useState<string>('오늘 완성한 나의 포근한 방!');
  const photoCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      soundManager.playShutter();
      // Confetti burst
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFAA91', '#FFEAA7', '#55EFC4', '#74B9FF'],
      });

      // Render room to image if canvas element is present
      if (canvasElement) {
        // Create an SVG-based or HTML canvas snapshot
        captureCanvas();
      }
    }
  }, [isOpen]);

  const captureCanvas = () => {
    if (!canvasElement) return;

    try {
      const svgNodes = canvasElement.querySelectorAll('svg');
      // For now, prepare snapshot preview
      const rect = canvasElement.getBoundingClientRect();
      const canvas = document.createElement('canvas');
      canvas.width = rect.width * 1.5;
      canvas.height = rect.height * 1.5;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Draw room background representation
        ctx.fillStyle = roomSettings.wallColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.52);

        ctx.fillStyle = '#C99E6C';
        ctx.fillRect(0, canvas.height * 0.52, canvas.width, canvas.height * 0.48);

        // Header plate
        ctx.fillStyle = '#FFFFFF';
        ctx.roundRect(40, 30, 320, 50, 25);
        ctx.fill();

        ctx.fillStyle = '#5A381E';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText(`🏡 ${userProfile.roomName}`, 60, 64);

        setPhotoDataUrl(canvas.toDataURL('image/png'));
      }
    } catch {
      // fallback
    }
  };

  if (!isOpen) return null;

  const handleDownload = () => {
    soundManager.playSparkle();

    // Create an elegant polaroid export canvas
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 800;
    exportCanvas.height = 1000;
    const ctx = exportCanvas.getContext('2d');

    if (ctx) {
      // Polaroid white card background with soft shadow
      ctx.fillStyle = '#FCFBF9';
      ctx.fillRect(0, 0, 800, 1000);

      // Inner Photo Border
      ctx.fillStyle = roomSettings.wallColor;
      ctx.fillRect(50, 50, 700, 680);

      // Floor
      ctx.fillStyle = '#DDB889';
      ctx.fillRect(50, 50 + 680 * 0.52, 700, 680 * 0.48);

      // Baseboard line
      ctx.fillStyle = '#6B4423';
      ctx.fillRect(50, 50 + 680 * 0.52, 700, 8);

      // Polaroid caption area
      ctx.fillStyle = '#2C1810';
      ctx.font = 'bold 36px "Noto Sans KR", sans-serif';
      ctx.fillText(userProfile.roomName, 60, 800);

      ctx.fillStyle = '#8C6E52';
      ctx.font = '22px "Noto Sans KR", sans-serif';
      ctx.fillText(`꾸민 이: ${userProfile.name} · 가구 ${placedItemsCount}개 배치 완료`, 60, 845);

      ctx.fillStyle = '#A89F91';
      ctx.font = '18px "Noto Sans KR", sans-serif';
      const today = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      ctx.fillText(`${today} · ${customNote}`, 60, 885);

      // Stamp
      ctx.font = '48px sans-serif';
      ctx.fillText(selectedStamp, 690, 840);

      // Download trigger
      const link = document.createElement('a');
      link.download = `${userProfile.roomName.replace(/\s+/g, '_')}_방꾸미기.png`;
      link.href = exportCanvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl shadow-2xl border border-amber-900/15 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-amber-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📸</span>
            <h3 className="font-bold text-base">내 방 폴라로이드 사진첩</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Polaroid Frame Preview */}
          <div
            ref={photoCardRef}
            className="bg-white p-5 pb-8 rounded-2xl shadow-xl border border-amber-900/10 max-w-md mx-auto relative transition-transform hover:scale-[1.01]"
          >
            {/* Washi tape decoration */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-200/80 backdrop-blur-xs rotate-1 shadow-xs border-y border-amber-300/60" />

            {/* Room Snapshot Area */}
            <div
              className="w-full aspect-[4/3] rounded-xl overflow-hidden relative shadow-inner border border-amber-900/10 flex flex-col"
              style={{ backgroundColor: roomSettings.wallColor }}
            >
              {/* Wall */}
              <div className="h-[52%] relative flex items-center justify-center">
                <span className="text-sm font-semibold text-amber-950/70 bg-white/60 px-3 py-1 rounded-full shadow-2xs">
                  🏡 {userProfile.roomName}
                </span>
              </div>
              {/* Molding */}
              <div className="h-2 bg-amber-950/20" />
              {/* Floor */}
              <div className="flex-1 bg-[#DDB889] relative flex items-center justify-around px-6">
                <span className="text-xs text-amber-950/80 font-medium">
                  {userProfile.name}님의 아늑한 보금자리
                </span>
                <span className="text-2xl animate-bounce">{selectedStamp}</span>
              </div>
            </div>

            {/* Polaroid Label Section */}
            <div className="mt-5 space-y-1.5 px-2">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-amber-950 tracking-tight">
                  {userProfile.roomName}
                </h4>
                <span className="text-2xl">{selectedStamp}</span>
              </div>

              <div className="text-xs text-amber-800/80 flex items-center gap-2">
                <span>꾸민 이: {userProfile.name}</span>
                <span>·</span>
                <span>가구 {placedItemsCount}개 배치 완료</span>
              </div>

              <div className="text-[11px] text-slate-500 font-mono pt-1">
                {new Date().toLocaleDateString('ko-KR')} · {customNote}
              </div>
            </div>
          </div>

          {/* Stamp & Custom Note Picker */}
          <div className="space-y-3 bg-amber-50/60 p-4 rounded-2xl border border-amber-900/10">
            <div>
              <span className="block text-xs font-semibold text-amber-950 mb-1.5">
                폴라로이드 감성 스탬프:
              </span>
              <div className="flex items-center gap-2">
                {['🌸', '☕', '💖', '🌿', '🐱', '✨', '🐾'].map((stamp) => (
                  <button
                    key={stamp}
                    onClick={() => {
                      setSelectedStamp(stamp);
                      soundManager.playRotate();
                    }}
                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                      selectedStamp === stamp
                        ? 'bg-amber-800 text-white shadow-xs scale-110'
                        : 'bg-white border border-amber-900/10 hover:bg-amber-100'
                    }`}
                  >
                    {stamp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-amber-950 mb-1">
                한 줄 기록 남기기:
              </span>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                maxLength={30}
                placeholder="예: 오늘 완성한 나의 포근한 방!"
                className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-amber-900/15 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Download Action */}
          <button
            onClick={handleDownload}
            className="w-full py-3.5 px-6 rounded-2xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>폴라로이드 사진 다운로드 (PNG)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
