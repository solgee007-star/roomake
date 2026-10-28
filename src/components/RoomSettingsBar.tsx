import React, { useState } from 'react';
import { RoomSettings, TimeOfDay, WeatherType, BackgroundThemePreset } from '../types/room';
import { WALL_COLORS, FLOOR_OPTIONS, BACKGROUND_THEME_PRESETS } from '../data/furnitureData';
import { soundManager } from '../utils/audio';
import {
  Sun,
  Sunset,
  Moon,
  Undo2,
  Redo2,
  RotateCcw,
  Camera,
  Wand2,
  Paintbrush,
  Sparkles,
  Grid,
  Music,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface Props {
  settings: RoomSettings;
  onUpdateSettings: (newSettings: Partial<RoomSettings>) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onResetRoom: () => void;
  onOpenPresets: () => void;
  onTakePhoto: () => void;
}

export const RoomSettingsBar: React.FC<Props> = ({
  settings,
  onUpdateSettings,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onResetRoom,
  onOpenPresets,
  onTakePhoto,
}) => {
  const [activeTab, setActiveTab] = useState<'theme-bg' | 'wall' | 'floor' | 'ambience' | null>(null);

  const handleApplyThemePreset = (preset: BackgroundThemePreset) => {
    soundManager.playSparkle();
    onUpdateSettings({
      wallColor: preset.wallColor,
      wallPattern: preset.wallPattern,
      floorType: preset.floorType,
    });
  };

  const handleTimeChange = (time: TimeOfDay) => {
    soundManager.playRotate();
    onUpdateSettings({ timeOfDay: time });
  };

  const handleWeatherChange = (weather: WeatherType) => {
    soundManager.playRotate();
    onUpdateSettings({ weather });
  };

  const toggleMusic = () => {
    const nextState = !settings.musicEnabled;
    onUpdateSettings({ musicEnabled: nextState });
    soundManager.toggleMusic(nextState);
  };

  const toggleSfx = () => {
    const nextState = !settings.sfxEnabled;
    onUpdateSettings({ sfxEnabled: nextState });
    soundManager.setSfxMuted(!nextState);
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-amber-900/10 p-2.5 flex flex-col gap-2 text-slate-700">
      {/* Top Row: Toolbar Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: History & Presets & Photo */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-2 rounded-xl hover:bg-amber-50 active:bg-amber-100 disabled:opacity-35 text-amber-950 transition-colors cursor-pointer"
            title="되돌리기 (Undo)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-2 rounded-xl hover:bg-amber-50 active:bg-amber-100 disabled:opacity-35 text-amber-950 transition-colors cursor-pointer"
            title="다시 실행 (Redo)"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-slate-200 mx-1" />

          {/* Room Presets */}
          <button
            onClick={onOpenPresets}
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-900/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-700" />
            <span>추천 가구배치</span>
          </button>

          {/* Photo Mode */}
          <button
            onClick={onTakePhoto}
            className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-amber-200" />
            <span>사진 찍기</span>
          </button>
        </div>

        {/* Center: Background & Ambience Tab Switches */}
        <div className="flex items-center gap-1 bg-amber-50/70 p-1 rounded-xl border border-amber-900/10">
          <button
            onClick={() => setActiveTab(activeTab === 'theme-bg' ? null : 'theme-bg')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'theme-bg'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-amber-950 hover:bg-amber-100/70'
            }`}
          >
            <Paintbrush className="w-3.5 h-3.5 text-amber-300" />
            <span>테마별 방 배경</span>
          </button>

          <button
            onClick={() => setActiveTab(activeTab === 'wall' ? null : 'wall')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'wall'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-100/70'
            }`}
          >
            벽지 상세
          </button>

          <button
            onClick={() => setActiveTab(activeTab === 'floor' ? null : 'floor')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'floor'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-100/70'
            }`}
          >
            바닥재 상세
          </button>

          <button
            onClick={() => setActiveTab(activeTab === 'ambience' ? null : 'ambience')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'ambience'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-100/70'
            }`}
          >
            조명 & 날씨
          </button>
        </div>

        {/* Right: Grid, Audio, Reset */}
        <div className="flex items-center gap-1.5">
          {/* Time of Day Shortcut Pills */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl mr-1">
            <button
              onClick={() => handleTimeChange('day')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                settings.timeOfDay === 'day'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="화사한 낮"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleTimeChange('sunset')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                settings.timeOfDay === 'sunset'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="감성 노을"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleTimeChange('night')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                settings.timeOfDay === 'night'
                  ? 'bg-indigo-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="아늑한 밤"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid Snap Toggle */}
          <button
            onClick={() => {
              soundManager.playRotate();
              onUpdateSettings({ gridSnap: !settings.gridSnap, showGrid: !settings.showGrid });
            }}
            className={`p-2 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              settings.gridSnap
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'hover:bg-slate-100 text-slate-500'
            }`}
            title={settings.gridSnap ? '격자 자석 켜짐' : '격자 자석 꺼짐'}
          >
            <Grid className="w-4 h-4" />
            <span className="text-[11px] hidden xl:inline">자석</span>
          </button>

          {/* Ambient Synth Lo-fi Music */}
          <button
            onClick={toggleMusic}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              settings.musicEnabled
                ? 'bg-emerald-100 text-emerald-800'
                : 'hover:bg-slate-100 text-slate-400'
            }`}
            title={settings.musicEnabled ? '배경음 끄기' : '아늑한 힐링 BGM 켜기'}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* SFX */}
          <button
            onClick={toggleSfx}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              settings.sfxEnabled
                ? 'bg-amber-100 text-amber-900'
                : 'hover:bg-slate-100 text-slate-400'
            }`}
            title={settings.sfxEnabled ? '효과음 켜짐' : '효과음 음소거'}
          >
            {settings.sfxEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Reset Room */}
          <button
            onClick={onResetRoom}
            className="p-2 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
            title="방 비우기 (가구 모두 치우기)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Drawer: 1. Curated Theme Backgrounds (테마별 방 배경) */}
      {activeTab === 'theme-bg' && (
        <div className="pt-3 pb-2 border-t border-slate-200 mt-1 animate-fade-in text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>추천 테마별 방 배경 조합 (벽지 + 바닥재 세트)</span>
            </span>
            <span className="text-[11px] text-slate-500">
              클릭 한 번으로 방의 벽지와 바닥재가 조화롭게 변신합니다
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {BACKGROUND_THEME_PRESETS.map((preset) => {
              const isSelected =
                settings.wallColor === preset.wallColor &&
                settings.floorType === preset.floorType;

              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyThemePreset(preset)}
                  className={`group p-2 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-100/90 border-amber-600 ring-2 ring-amber-500/30 shadow-xs'
                      : 'bg-white border-amber-900/10 hover:border-amber-400 hover:shadow-xs'
                  }`}
                >
                  {/* Visual Dual Swatch (Wall top + Floor bottom) */}
                  <div className="w-full h-12 rounded-lg overflow-hidden border border-black/10 flex flex-col mb-1.5 shadow-2xs">
                    <div className="h-1/2 w-full" style={{ backgroundColor: preset.wallPreview }} />
                    <div className="h-1/2 w-full" style={{ backgroundColor: preset.floorPreview }} />
                  </div>

                  <div>
                    <div className="font-bold text-amber-950 text-xs truncate">
                      {preset.name}
                    </div>
                    <div className="text-[10px] text-amber-800/80 font-medium truncate mt-0.5">
                      {preset.styleLabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Expanded Drawer: 2. Granular Wallpaper Customizer */}
      {activeTab === 'wall' && (
        <div className="pt-3 pb-2 border-t border-slate-200 mt-1 space-y-3 animate-fade-in text-xs">
          {/* Wall colors */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-amber-950 mr-1">벽지 색상:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {WALL_COLORS.map((col) => (
                <button
                  key={col.name}
                  onClick={() => {
                    soundManager.playRotate();
                    onUpdateSettings({ wallColor: col.hex });
                  }}
                  className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 cursor-pointer ${
                    settings.wallColor === col.hex
                      ? 'ring-2 ring-amber-600 ring-offset-1 scale-110'
                      : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          </div>

          {/* Wall patterns */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-amber-950 mr-1">벽지 패턴 및 질감:</span>
            {[
              { id: 'solid', label: '단색 깔끔' },
              { id: 'concrete', label: '모던 콘크리트' },
              { id: 'vertical-stripes', label: '스트라이프' },
              { id: 'classic-damask', label: '클래식 다마스크' },
              { id: 'wood-panels', label: '우드 패널' },
              { id: 'wainscoting', label: '웨인스코팅 몰딩' },
              { id: 'brick', label: '빈티지 브릭' },
              { id: 'cute-stars', label: '은은한 별빛' },
            ].map((pat) => (
              <button
                key={pat.id}
                onClick={() => {
                  soundManager.playRotate();
                  onUpdateSettings({ wallPattern: pat.id as any });
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  settings.wallPattern === pat.id
                    ? 'bg-amber-800 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {pat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Expanded Drawer: 3. Granular Flooring Customizer */}
      {activeTab === 'floor' && (
        <div className="pt-3 pb-2 border-t border-slate-200 mt-1 animate-fade-in text-xs">
          <div className="font-bold text-amber-950 mb-2">바닥재 재질 및 패턴 선택:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {FLOOR_OPTIONS.map((floor) => (
              <button
                key={floor.id}
                onClick={() => {
                  soundManager.playRotate();
                  onUpdateSettings({ floorType: floor.id as any });
                }}
                className={`flex items-center gap-2 p-2 rounded-xl border transition-all cursor-pointer text-left ${
                  settings.floorType === floor.id
                    ? 'bg-amber-100/90 border-amber-600 text-amber-950 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span
                  className="w-5 h-5 rounded-md border border-black/15 shadow-2xs inline-block shrink-0"
                  style={{ backgroundColor: floor.bg }}
                />
                <div className="truncate">
                  <div className="text-xs truncate">{floor.name}</div>
                  <div className="text-[10px] text-slate-500 font-normal">{floor.tag}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Expanded Drawer: 4. Ambience & Weather */}
      {activeTab === 'ambience' && (
        <div className="pt-3 pb-2 border-t border-slate-200 mt-1 flex flex-wrap items-center justify-between gap-4 animate-fade-in text-xs">
          {/* Time */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-950">시간대 조명:</span>
            {[
              { id: 'day', label: '화사한 낮 ☀️' },
              { id: 'sunset', label: '감성 노을 🌅' },
              { id: 'night', label: '포근한 밤 🌙' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => handleTimeChange(t.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  settings.timeOfDay === t.id
                    ? 'bg-amber-800 text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Weather */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-950">날씨 연출:</span>
            {[
              { id: 'sunny', label: '맑음 맑음' },
              { id: 'rain', label: '토닥토닥 빗소리 🌧️' },
              { id: 'petals', label: '살랑이는 벚꽃 🌸' },
              { id: 'stars', label: '반짝이는 별빛 ✨' },
            ].map((w) => (
              <button
                key={w.id}
                onClick={() => handleWeatherChange(w.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  settings.weather === w.id
                    ? 'bg-amber-800 text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
