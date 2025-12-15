"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCcw, Eye } from "lucide-react";
import { getShuffledDeck, TarotCard, getFullImageUrl } from "@/utils/tarotDeck";
import { getTarotReading } from "./actions";
import clsx from "clsx";

// Steps of the reading process
type Step = "input" | "shuffle" | "pick" | "reading";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [reading, setReading] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize deck on load
  useEffect(() => {
    setDeck(getShuffledDeck());
  }, []);

  const handleStart = () => {
    if (!question.trim()) return;
    setStep("shuffle");
    // Simulate shuffle delay then move to pick
    setTimeout(() => setStep("pick"), 1500);
  };

  const handleCardClick = (card: TarotCard) => {
    if (selectedCards.length >= 3) return;
    if (selectedCards.find((c) => c.id === card.id)) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 3) {
      // Small delay before starting reading to let animation finish
      setTimeout(() => startReading(newSelected), 1000);
    }
  };

  const startReading = async (cards: TarotCard[]) => {
    setStep("reading");
    setIsLoading(true);
    try {
      const result = await getTarotReading(question, cards);
      setReading(result);
    } catch (e) {
      setReading("🛑 宇宙信号中断，请重试。");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep("input");
    setQuestion("");
    setSelectedCards([]);
    setReading("");
    setDeck(getShuffledDeck());
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-purple-500 selection:text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Header */}
      <header className="absolute top-6 left-0 right-0 text-center z-10">
        <h1 className="text-2xl md:text-3xl font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200 opacity-80">
          BLUNT TAROT
        </h1>
        <p className="text-xs text-slate-500 uppercase tracking-[0.3em] mt-1">直言不讳 · 灵魂拷问</p>
      </header>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center min-h-[600px] justify-center">
        <AnimatePresence mode="wait">
          {/* STEP 1: INPUT */}
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-lg text-center space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-serif text-slate-200">
                  有什么想问的？
                </h2>
                <p className="text-slate-400 font-light">
                  别问那种你自己心里有答案的问题。
                  <br />
                  问点让你睡不着觉的。
                </p>
              </div>

              <div className="relative group">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="输入你的困惑..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-lg focus:outline-none focus:border-purple-500/50 transition-all min-h-[150px] resize-none custom-scrollbar shadow-xl"
                />
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-focus-within:opacity-20 blur transition-opacity -z-10" />
              </div>

              <button
                onClick={handleStart}
                disabled={!question.trim()}
                className="group relative px-8 py-4 bg-slate-100 text-slate-950 font-bold tracking-wide rounded-full overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  开始洗牌 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: SHUFFLE ANIMATION */}
          {step === "shuffle" && (
            <motion.div
              key="shuffle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-8"
            >
              <div className="relative w-48 h-72">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-xl shadow-2xl backface-hidden"
                    initial={{ rotate: 0, x: 0 }}
                    animate={{
                      rotate: [0, Math.random() * 20 - 10, 0],
                      x: [0, Math.random() * 40 - 20, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    <div className="w-full h-full opacity-20 bg-[url('https://www.sacred-texts.com/tarot/pkt/img/cardback.jpg')] bg-cover bg-center rounded-xl" />
                  </motion.div>
                ))}
              </div>
              <p className="text-slate-400 animate-pulse tracking-widest text-sm">洗牌中...</p>
            </motion.div>
          )}

          {/* STEP 3: PICK CARDS */}
          {step === "pick" && (
            <motion.div
              key="pick"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center space-y-8"
            >
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-serif text-slate-200">
                  抽取三张牌 ({selectedCards.length}/3)
                </h3>
                <p className="text-slate-500 text-sm">
                  凭直觉点击，不要犹豫
                </p>
              </div>

              {/* Deck Spread */}
              <div className="relative w-full max-w-5xl h-[300px] flex items-center justify-center perspective-1000">
                {deck.slice(0, 22).map((card, index) => {
                  const isSelected = selectedCards.find((c) => c.id === card.id);
                  // Calculate fan position
                  const totalCards = 22;
                  const angle = (index - totalCards / 2) * 5; // Fan spread angle
                  const xOffset = (index - totalCards / 2) * 12; // Horizontal spread

                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ 
                        opacity: isSelected ? 0 : 1, 
                        y: isSelected ? -100 : 0,
                        rotate: angle,
                        x: xOffset,
                      }}
                      whileHover={{ y: -20, zIndex: 10, scale: 1.1 }}
                      onClick={() => handleCardClick(card)}
                      className="absolute w-24 h-40 md:w-32 md:h-52 bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/30 rounded-lg shadow-xl cursor-pointer hover:border-indigo-400 transition-colors origin-bottom transform-gpu"
                      style={{ 
                        zIndex: index,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' 
                      }}
                    >
                      <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#1e1b4b_10px,#1e1b4b_20px)] rounded-lg" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: READING / RESULT */}
          {step === "reading" && (
            <motion.div
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            >
              {/* Cards Display */}
              <div className="md:col-span-3 flex justify-center gap-4 md:gap-8 mb-8">
                {selectedCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ rotateY: 180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ delay: index * 0.3, duration: 0.8, type: "spring" }}
                    className="relative w-28 h-48 md:w-40 md:h-64 preserve-3d"
                  >
                    <div className="w-full h-full bg-slate-800 rounded-lg shadow-2xl overflow-hidden border border-slate-700">
                      <img
                        src={getFullImageUrl(card.image)}
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-2 text-center">
                        <p className="text-xs md:text-sm text-white font-serif">{card.nameCN}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Analysis Output */}
              <div className="md:col-span-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-xl min-h-[400px] relative">
                {isLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                    <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
                    <p className="text-purple-200 animate-pulse font-serif">正在链接高维信息...</p>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none">
                    <div className="flex justify-between items-start mb-6 border-b border-slate-800 pb-4">
                      <div className="text-sm text-slate-500">
                        <span className="block text-xs uppercase tracking-wider mb-1">Question</span>
                        "{question}"
                      </div>
                      <button 
                        onClick={reset}
                        className="text-slate-500 hover:text-white transition-colors"
                        title="New Reading"
                      >
                        <RefreshCcw className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Render Reading with Line Breaks */}
                    <div className="space-y-4 font-light leading-relaxed text-slate-200 text-lg">
                      {reading.split('\n').map((line, i) => {
                        if (line.trim() === "") return <br key={i} />;
                        
                        // Style specific headers based on emojis used in prompt
                        if (line.includes("🛑")) return <p key={i} className="text-red-300 font-medium bg-red-950/20 p-4 rounded-lg border border-red-900/30">{line}</p>;
                        if (line.includes("🔮")) return <p key={i} className="text-purple-300 font-serif text-xl mt-6">{line}</p>;
                        if (line.includes("👉") || line.includes("⚠️")) return <p key={i} className="text-amber-200 font-bold bg-amber-950/20 p-3 rounded-l border-l-4 border-amber-500 my-4">{line}</p>;
                        
                        return <p key={i}>{line}</p>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}