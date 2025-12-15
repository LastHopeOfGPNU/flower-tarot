export interface TarotCard {
  name: string;
  id: string;
  image: string; // URL path suffix for sacred-texts
  meaningUp: string;
  meaningRev: string;
}

// Simplified Deck (Major Arcana for high impact)
const MAJOR_ARCANA: TarotCard[] = [
  { name: "The Fool", id: "ar00", image: "ar00.jpg", meaningUp: "New beginnings, innocence", meaningRev: "Recklessness" },
  { name: "The Magician", id: "ar01", image: "ar01.jpg", meaningUp: "Manifestation, power", meaningRev: "Manipulation" },
  { name: "The High Priestess", id: "ar02", image: "ar02.jpg", meaningUp: "Intuition, subconscious", meaningRev: "Secrets" },
  { name: "The Empress", id: "ar03", image: "ar03.jpg", meaningUp: "Fertility, nature", meaningRev: "Dependence" },
  { name: "The Emperor", id: "ar04", image: "ar04.jpg", meaningUp: "Authority, structure", meaningRev: "Tyranny" },
  { name: "The Hierophant", id: "ar05", image: "ar05.jpg", meaningUp: "Tradition, conformity", meaningRev: "Rebellion" },
  { name: "The Lovers", id: "ar06", image: "ar06.jpg", meaningUp: "Partnership, union", meaningRev: "Disharmony" },
  { name: "The Chariot", id: "ar07", image: "ar07.jpg", meaningUp: "Control, willpower", meaningRev: "Lack of direction" },
  { name: "Strength", id: "ar08", image: "ar08.jpg", meaningUp: "Courage, persuasion", meaningRev: "Self-doubt" },
  { name: "The Hermit", id: "ar09", image: "ar09.jpg", meaningUp: "Introspection, guidance", meaningRev: "Isolation" },
  { name: "Wheel of Fortune", id: "ar10", image: "ar10.jpg", meaningUp: "Change, cycles", meaningRev: "Bad luck" },
  { name: "Justice", id: "ar11", image: "ar11.jpg", meaningUp: "Fairness, truth", meaningRev: "Dishonesty" },
  { name: "The Hanged Man", id: "ar12", image: "ar12.jpg", meaningUp: "Surrender, perspective", meaningRev: "Stalling" },
  { name: "Death", id: "ar13", image: "ar13.jpg", meaningUp: "Endings, transformation", meaningRev: "Resistance to change" },
  { name: "Temperance", id: "ar14", image: "ar14.jpg", meaningUp: "Balance, moderation", meaningRev: "Imbalance" },
  { name: "The Devil", id: "ar15", image: "ar15.jpg", meaningUp: "Addiction, materialism", meaningRev: "Detachment" },
  { name: "The Tower", id: "ar16", image: "ar16.jpg", meaningUp: "Sudden change, upheaval", meaningRev: "Avoidance of disaster" },
  { name: "The Star", id: "ar17", image: "ar17.jpg", meaningUp: "Hope, faith", meaningRev: "Despair" },
  { name: "The Moon", id: "ar18", image: "ar18.jpg", meaningUp: "Illusion, fear", meaningRev: "Confusion" },
  { name: "The Sun", id: "ar19", image: "ar19.jpg", meaningUp: "Positivity, success", meaningRev: "Temporary depression" },
  { name: "Judgement", id: "ar20", image: "ar20.jpg", meaningUp: "Rebirth, inner calling", meaningRev: "Self-doubt" },
  { name: "The World", id: "ar21", image: "ar21.jpg", meaningUp: "Completion, travel", meaningRev: "Incomplete" },
];

export const getFullImageUrl = (filename: string) => `https://www.sacred-texts.com/tarot/pkt/img/${filename}`;

export const drawCards = (count: number = 3): TarotCard[] => {
  const shuffled = [...MAJOR_ARCANA].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
