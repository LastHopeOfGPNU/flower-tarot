export interface TarotCard {
  name: string;
  nameCN: string; // Chinese name
  id: string;
  image: string; // URL path suffix
  meaningUp: string;
  meaningRev: string;
}

// 修复点：使用稳定的 GitHub 图源（Rider-Waite 原始版本）
// 原来的 sacred-texts 链接已失效
const BASE_IMAGE_URL = "https://raw.githubusercontent.com/tlenghan/tarot-card-json/master/images";

export const getFullImageUrl = (filename: string) => {
  // 确保 filename 是干净的
  const cleanName = filename.trim();
  return `${BASE_IMAGE_URL}/${cleanName}`;
};

// Simplified Deck (Major Arcana for high impact)
const MAJOR_ARCANA: TarotCard[] = [
  { name: "The Fool", nameCN: "愚人", id: "ar00", image: "ar00.jpg", meaningUp: "New beginnings, innocence", meaningRev: "Recklessness" },
  { name: "The Magician", nameCN: "魔术师", id: "ar01", image: "ar01.jpg", meaningUp: "Manifestation, power", meaningRev: "Manipulation" },
  { name: "The High Priestess", nameCN: "女祭司", id: "ar02", image: "ar02.jpg", meaningUp: "Intuition, subconscious", meaningRev: "Secrets" },
  { name: "The Empress", nameCN: "皇后", id: "ar03", image: "ar03.jpg", meaningUp: "Fertility, nature", meaningRev: "Dependence" },
  { name: "The Emperor", nameCN: "皇帝", id: "ar04", image: "ar04.jpg", meaningUp: "Authority, structure", meaningRev: "Tyranny" },
  { name: "The Hierophant", nameCN: "教皇", id: "ar05", image: "ar05.jpg", meaningUp: "Tradition, conformity", meaningRev: "Rebellion" },
  { name: "The Lovers", nameCN: "恋人", id: "ar06", image: "ar06.jpg", meaningUp: "Partnership, union", meaningRev: "Disharmony" },
  { name: "The Chariot", nameCN: "战车", id: "ar07", image: "ar07.jpg", meaningUp: "Control, willpower", meaningRev: "Lack of direction" },
  { name: "Strength", nameCN: "力量", id: "ar08", image: "ar08.jpg", meaningUp: "Courage, persuasion", meaningRev: "Self-doubt" },
  { name: "The Hermit", nameCN: "隐士", id: "ar09", image: "ar09.jpg", meaningUp: "Introspection, guidance", meaningRev: "Isolation" },
  { name: "Wheel of Fortune", nameCN: "命运之轮", id: "ar10", image: "ar10.jpg", meaningUp: "Change, cycles", meaningRev: "Bad luck" },
  { name: "Justice", nameCN: "正义", id: "ar11", image: "ar11.jpg", meaningUp: "Fairness, truth", meaningRev: "Dishonesty" },
  { name: "The Hanged Man", nameCN: "倒吊人", id: "ar12", image: "ar12.jpg", meaningUp: "Surrender, perspective", meaningRev: "Stalling" },
  { name: "Death", nameCN: "死神", id: "ar13", image: "ar13.jpg", meaningUp: "Endings, transformation", meaningRev: "Resistance to change" },
  { name: "Temperance", nameCN: "节制", id: "ar14", image: "ar14.jpg", meaningUp: "Balance, moderation", meaningRev: "Imbalance" },
  { name: "The Devil", nameCN: "恶魔", id: "ar15", image: "ar15.jpg", meaningUp: "Addiction, materialism", meaningRev: "Detachment" },
  { name: "The Tower", nameCN: "高塔", id: "ar16", image: "ar16.jpg", meaningUp: "Sudden change, upheaval", meaningRev: "Avoidance of disaster" },
  { name: "The Star", nameCN: "星星", id: "ar17", image: "ar17.jpg", meaningUp: "Hope, faith", meaningRev: "Despair" },
  { name: "The Moon", nameCN: "月亮", id: "ar18", image: "ar18.jpg", meaningUp: "Illusion, fear", meaningRev: "Confusion" },
  { name: "The Sun", nameCN: "太阳", id: "ar19", image: "ar19.jpg", meaningUp: "Positivity, success", meaningRev: "Temporary depression" },
  { name: "Judgement", nameCN: "审判", id: "ar20", image: "ar20.jpg", meaningUp: "Rebirth, inner calling", meaningRev: "Self-doubt" },
  { name: "The World", nameCN: "世界", id: "ar21", image: "ar21.jpg", meaningUp: "Completion, travel", meaningRev: "Incomplete" },
];

// Returns the full deck shuffled
export const getShuffledDeck = (): TarotCard[] => {
  return [...MAJOR_ARCANA].sort(() => 0.5 - Math.random());
};

// Kept for backward compatibility if needed, though we use manual picking now
export const drawCards = (count: number = 3): TarotCard[] => {
  return getShuffledDeck().slice(0, count);
};
