import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import {
  Gamepad2,
  Sparkles,
  Trophy,
  Coins,
  X,
  Play,
  RotateCcw,
  Flame,
  CheckCircle2,
  Gift,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onEarnCoins: (amount: number) => void;
  currentCoins: number;
}

type MiniGameTab = 'dust' | 'memory' | 'lucky';

export const MiniGameModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onEarnCoins,
  currentCoins,
}) => {
  const [activeTab, setActiveTab] = useState<MiniGameTab>('dust');

  // ==========================================
  // GAME 1: DUST BUNNY POPPING (먼지 팡팡 방 청소)
  // ==========================================
  const [dustGameState, setDustGameState] = useState<'IDLE' | 'PLAYING' | 'OVER'>('IDLE');
  const [dustScore, setDustScore] = useState(0);
  const [dustTimeLeft, setDustTimeLeft] = useState(25);
  const [activeDusts, setActiveDusts] = useState<{ id: number; gridIdx: number; isGold: boolean }[]>([]);
  const [dustCombo, setDustCombo] = useState(0);
  const dustIdCounter = useRef(0);

  // Timer loop for dust game
  useEffect(() => {
    let timer: any = null;
    let spawner: any = null;

    if (dustGameState === 'PLAYING') {
      timer = setInterval(() => {
        setDustTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            clearInterval(spawner);
            endDustGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      spawner = setInterval(() => {
        spawnDust();
      }, 650);
    }

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [dustGameState]);

  const startDustGame = () => {
    soundManager.playSparkle();
    setDustScore(0);
    setDustCombo(0);
    setDustTimeLeft(25);
    setActiveDusts([]);
    setDustGameState('PLAYING');
  };

  const spawnDust = () => {
    const randomGrid = Math.floor(Math.random() * 12);
    const isGold = Math.random() < 0.22;
    const newDust = {
      id: dustIdCounter.current++,
      gridIdx: randomGrid,
      isGold,
    };

    setActiveDusts((prev) => {
      // keep max 4 at once
      const trimmed = prev.length >= 4 ? prev.slice(1) : prev;
      return [...trimmed, newDust];
    });
  };

  const popDust = (id: number, isGold: boolean) => {
    soundManager.playPlace();
    const points = isGold ? 25 : 10;
    setDustScore((prev) => prev + points + Math.min(dustCombo * 2, 10));
    setDustCombo((prev) => prev + 1);

    setActiveDusts((prev) => prev.filter((d) => d.id !== id));
  };

  const endDustGame = () => {
    setDustGameState('OVER');
    soundManager.playSparkle();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1'],
    });
  };

  const claimDustReward = () => {
    const earned = Math.max(120, Math.floor(dustScore * 1.5));
    onEarnCoins(earned);
    soundManager.playSparkle();
    setDustGameState('IDLE');
  };

  // ==========================================
  // GAME 2: MEMORY CARD MATCH (가구 짝맞추기)
  // ==========================================
  const MEMORY_ICONS = ['🛏️', '🛋️', '🌿', '🎸', '🐱', '💡', '📺', '🧸'];
  interface MemoryCard {
    id: number;
    icon: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryMatches, setMemoryMatches] = useState(0);
  const [memoryGameState, setMemoryGameState] = useState<'IDLE' | 'PLAYING' | 'OVER'>('IDLE');
  const [memoryTimer, setMemoryTimer] = useState(40);

  const startMemoryGame = () => {
    soundManager.playSparkle();
    const deck = [...MEMORY_ICONS, ...MEMORY_ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, idx) => ({
        id: idx,
        icon,
        isFlipped: false,
        isMatched: false,
      }));

    setMemoryCards(deck);
    setFlippedIndices([]);
    setMemoryMoves(0);
    setMemoryMatches(0);
    setMemoryTimer(45);
    setMemoryGameState('PLAYING');
  };

  useEffect(() => {
    let t: any = null;
    if (memoryGameState === 'PLAYING') {
      t = setInterval(() => {
        setMemoryTimer((prev) => {
          if (prev <= 1) {
            clearInterval(t);
            setMemoryGameState('OVER');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(t);
  }, [memoryGameState]);

  const handleCardClick = (index: number) => {
    if (
      memoryGameState !== 'PLAYING' ||
      flippedIndices.length >= 2 ||
      memoryCards[index].isFlipped ||
      memoryCards[index].isMatched
    ) {
      return;
    }

    soundManager.playRotate();
    const updated = [...memoryCards];
    updated[index].isFlipped = true;
    setMemoryCards(updated);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (updated[first].icon === updated[second].icon) {
        // Matched
        setTimeout(() => {
          soundManager.playPlace();
          updated[first].isMatched = true;
          updated[second].isMatched = true;
          setMemoryCards([...updated]);
          setFlippedIndices([]);
          const nextMatches = memoryMatches + 1;
          setMemoryMatches(nextMatches);

          if (nextMatches === MEMORY_ICONS.length) {
            soundManager.playSparkle();
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.6 },
            });
            setMemoryGameState('OVER');
          }
        }, 400);
      } else {
        // Not matched
        setTimeout(() => {
          updated[first].isFlipped = false;
          updated[second].isFlipped = false;
          setMemoryCards([...updated]);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const claimMemoryReward = () => {
    const base = memoryMatches * 35;
    const timeBonus = memoryTimer * 3;
    const earned = Math.max(100, base + timeBonus);
    onEarnCoins(earned);
    soundManager.playSparkle();
    setMemoryGameState('IDLE');
  };

  // ==========================================
  // GAME 3: LUCKY REWARD BOX (행운의 선물상자)
  // ==========================================
  const [luckyClaimed, setLuckyClaimed] = useState(false);
  const [luckyAmount, setLuckyAmount] = useState(0);

  const openLuckyBox = () => {
    if (luckyClaimed) return;
    soundManager.playSparkle();
    const reward = Math.floor(Math.random() * 200) + 150; // 150 ~ 350 coins
    setLuckyAmount(reward);
    setLuckyClaimed(true);
    onEarnCoins(reward);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-5 bg-slate-900/65 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-amber-900/15 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl shadow-inner">
              🎮
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                <span>코인 획득 미니게임 아케이드</span>
              </h2>
              <p className="text-xs text-amber-200/90">
                미니게임을 플레이하고 코인을 모아 예쁜 가구를 쇼핑하세요!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full border border-white/20 font-mono font-bold text-amber-300 text-xs">
              <Coins className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentCoins.toLocaleString()}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full text-white/80 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Tabs */}
        <div className="flex items-center gap-1 p-2 bg-amber-50/80 border-b border-amber-900/10">
          <button
            onClick={() => setActiveTab('dust')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'dust'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-100/70'
            }`}
          >
            <span>🧹</span>
            <span>먼지 팡팡! 방 청소</span>
          </button>
          <button
            onClick={() => setActiveTab('memory')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'memory'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-100/70'
            }`}
          >
            <span>🃏</span>
            <span>가구 짝맞추기</span>
          </button>
          <button
            onClick={() => setActiveTab('lucky')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'lucky'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-100/70'
            }`}
          >
            <span>🎁</span>
            <span>행운의 선물상자</span>
          </button>
        </div>

        {/* Tab 1: Dust Bunny Popping */}
        {activeTab === 'dust' && (
          <div className="p-6 flex flex-col items-center justify-between min-h-[380px] overflow-y-auto">
            {dustGameState === 'IDLE' && (
              <div className="text-center space-y-4 my-auto">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-4xl shadow-inner animate-bounce">
                  ✨
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-950">
                    방에 숨은 먼지 요정들을 잡아주세요!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
                    제한 시간 25초 동안 방 구석구석 나타나는 먼지를 터치하세요! 황금 먼지를 잡으면 보너스 코인을 듬뿍 드려요.
                  </p>
                </div>
                <button
                  onClick={startDustGame}
                  className="px-8 py-3.5 rounded-2xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>청소 시작하기 (25초)</span>
                </button>
              </div>
            )}

            {dustGameState === 'PLAYING' && (
              <div className="w-full flex flex-col items-center gap-3">
                {/* Stats Bar */}
                <div className="w-full flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-amber-900/10 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">시간:</span>
                    <span className="font-mono font-bold text-base text-red-600">
                      {dustTimeLeft}초
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-bold text-amber-900">
                      콤보 x{dustCombo}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-amber-950">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>{dustScore} 점</span>
                  </div>
                </div>

                {/* 12-cell Dust Arena */}
                <div className="w-full grid grid-cols-4 gap-2.5 aspect-[4/3] bg-amber-100/50 p-3 rounded-2xl border border-amber-900/15">
                  {Array.from({ length: 12 }).map((_, gridIdx) => {
                    const dust = activeDusts.find((d) => d.gridIdx === gridIdx);
                    return (
                      <div
                        key={gridIdx}
                        className="relative rounded-xl bg-white/70 border border-amber-900/10 flex items-center justify-center overflow-hidden shadow-2xs select-none"
                      >
                        {dust && (
                          <button
                            onClick={() => popDust(dust.id, dust.isGold)}
                            className="w-full h-full flex flex-col items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer animate-fade-in"
                          >
                            <span className="text-3xl animate-bounce">
                              {dust.isGold ? '⭐' : '👾'}
                            </span>
                            <span
                              className={`text-[9px] font-bold ${
                                dust.isGold ? 'text-amber-600 font-extrabold' : 'text-slate-500'
                              }`}
                            >
                              {dust.isGold ? '+25 황금!' : '+10 먼지'}
                            </span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {dustGameState === 'OVER' && (
              <div className="text-center space-y-4 my-auto animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl shadow-inner">
                  🎉
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-950">방 청소 완료!</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    최종 점수: <span className="font-bold text-amber-900">{dustScore}점</span>
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-amber-100/80 px-4 py-2 rounded-2xl border border-amber-300 font-bold text-amber-950 text-base">
                    <Coins className="w-5 h-5 text-amber-600" />
                    <span>+{Math.max(120, Math.floor(dustScore * 1.5))} 코인 획득!</span>
                  </div>
                </div>

                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={claimDustReward}
                    className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    코인 받기
                  </button>
                  <button
                    onClick={startDustGame}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    한 판 더!
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Memory Card Match */}
        {activeTab === 'memory' && (
          <div className="p-6 flex flex-col items-center justify-between min-h-[380px] overflow-y-auto">
            {memoryGameState === 'IDLE' && (
              <div className="text-center space-y-4 my-auto">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-4xl shadow-inner animate-bounce">
                  🃏
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-950">가구 짝맞추기 챌린지</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
                    뒤집힌 카드 속 같은 가구 그림 2개를 찾아보세요! 빠르게 짝을 맞출수록 많은 보너스 코인을 획득합니다.
                  </p>
                </div>
                <button
                  onClick={startMemoryGame}
                  className="px-8 py-3.5 rounded-2xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>게임 시작하기</span>
                </button>
              </div>
            )}

            {memoryGameState === 'PLAYING' && (
              <div className="w-full flex flex-col items-center gap-3">
                <div className="w-full flex items-center justify-between bg-white px-4 py-2 rounded-2xl border border-amber-900/10 shadow-xs text-xs font-bold">
                  <span className="text-red-600 font-mono">남은 시간: {memoryTimer}초</span>
                  <span className="text-slate-600">시도: {memoryMoves}회</span>
                  <span className="text-amber-900">
                    맞춘 짝: {memoryMatches} / {MEMORY_ICONS.length}
                  </span>
                </div>

                {/* 4x4 Grid */}
                <div className="w-full max-w-sm grid grid-cols-4 gap-2 aspect-square">
                  {memoryCards.map((card, idx) => (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(idx)}
                      disabled={card.isFlipped || card.isMatched}
                      className={`rounded-xl text-2xl font-bold flex items-center justify-center transition-all cursor-pointer shadow-2xs border ${
                        card.isMatched
                          ? 'bg-emerald-100 border-emerald-300 opacity-60'
                          : card.isFlipped
                          ? 'bg-amber-100 border-amber-400 rotate-0 scale-105'
                          : 'bg-white hover:bg-amber-50 border-amber-900/15'
                      }`}
                    >
                      {card.isFlipped || card.isMatched ? card.icon : '❓'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {memoryGameState === 'OVER' && (
              <div className="text-center space-y-4 my-auto animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl shadow-inner">
                  🏆
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-950">
                    {memoryMatches === MEMORY_ICONS.length ? '모든 짝 맞추기 대성공!' : '시간 종료!'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    맞춘 짝: {memoryMatches}쌍 · 남은 시간: {memoryTimer}초
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-amber-100/80 px-4 py-2 rounded-2xl border border-amber-300 font-bold text-amber-950 text-base">
                    <Coins className="w-5 h-5 text-amber-600" />
                    <span>
                      +{Math.max(100, memoryMatches * 35 + memoryTimer * 3)} 코인 획득!
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={claimMemoryReward}
                    className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    코인 받기
                  </button>
                  <button
                    onClick={startMemoryGame}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    한 판 더!
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Lucky Box */}
        {activeTab === 'lucky' && (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[380px]">
            {!luckyClaimed ? (
              <>
                <div
                  onClick={openLuckyBox}
                  className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 border-2 border-amber-500 shadow-xl flex items-center justify-center text-5xl cursor-pointer hover:scale-110 active:scale-95 transition-transform animate-pulse"
                >
                  🎁
                </div>
                <div>
                  <h3 className="text-base font-bold text-amber-950">
                    상자를 열어 오늘의 행운 코인을 받으세요!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    150 ~ 350 코인이 무작위로 들어있어요.
                  </p>
                </div>
                <button
                  onClick={openLuckyBox}
                  className="px-6 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>상자 열기!</span>
                </button>
              </>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 flex items-center justify-center text-4xl shadow-inner">
                  💎
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-950">선물상자 개봉 완료!</h3>
                  <div className="mt-2 inline-flex items-center gap-2 bg-amber-100 px-5 py-2.5 rounded-2xl border border-amber-300 text-amber-950 font-bold text-lg">
                    <Coins className="w-5 h-5 text-amber-600" />
                    <span>+{luckyAmount} 코인을 받았습니다!</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  보유 중인 코인으로 상점에서 원하는 가구를 마음껏 구매하세요!
                </p>
                <button
                  onClick={() => {
                    soundManager.playRotate();
                    setLuckyClaimed(false);
                  }}
                  className="px-4 py-2 text-xs text-amber-800 hover:underline font-medium"
                >
                  다시 열어보기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
