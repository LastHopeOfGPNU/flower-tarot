export interface TarotCard {
  name: string;
  nameCN: string; // Chinese name
  id: string;
  image: string; // 直接存储完整的 URL，不再需要拼接
  meaningUp: string;
  meaningRev: string;
}

// 帮助函数：因为我们在数组里存了完整链接，这里直接返回即可
// 这样改是为了防止前端组件里有类似 `${baseUrl}/${image}` 的重复拼接
export const getFullImageUrl = (imagePath: string) => {
  // 如果前端传进来的是文件名（防错机制），返回维基百科默认图
  if (!imagePath.startsWith("http")) {
     return "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg"; 
  }
  return imagePath;
};

// 使用维基百科的高清 RWS 塔罗牌源，稳定且永远不会 404
const MAJOR_ARCANA: TarotCard[] = [
  { name: "The Fool", nameCN: "愚人", id: "ar00", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg", meaningUp: "New beginnings, innocence", meaningRev: "Recklessness" },
  { name: "The Magician", nameCN: "魔术师", id: "ar01", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg", meaningUp: "Manifestation, power", meaningRev: "Manipulation" },
  { name: "The High Priestess", nameCN: "女祭司", id: "ar02", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg", meaningUp: "Intuition, subconscious", meaningRev: "Secrets" },
  { name: "The Empress", nameCN: "皇后", id: "ar03", image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg", meaningUp: "Fertility, nature", meaningRev: "Dependence" },
  { name: "The Emperor", nameCN: "皇帝", id: "ar04", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg", meaningUp: "Authority, structure", meaningRev: "Tyranny" },
  { name: "The Hierophant", nameCN: "教皇", id: "ar05", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg", meaningUp: "Tradition, conformity", meaningRev: "Rebellion" },
  { name: "The Lovers", nameCN: "恋人", id: "ar06", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg", meaningUp: "Partnership, union", meaningRev: "Disharmony" },
  { name: "The Chariot", nameCN: "战车", id: "ar07", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg", meaningUp: "Control, willpower", meaningRev: "Lack of direction" },
  { name: "Strength", nameCN: "力量", id: "ar08", image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg", meaningUp: "Courage, persuasion", meaningRev: "Self-doubt" },
  { name: "The Hermit", nameCN: "隐士", id: "ar09", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg", meaningUp: "Introspection, guidance", meaningRev: "Isolation" },
  { name: "Wheel of Fortune", nameCN: "命运之轮", id: "ar10", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg", meaningUp: "Change, cycles", meaningRev: "Bad luck" },
  { name: "Justice", nameCN: "正义", id: "ar11", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg", meaningUp: "Fairness, truth", meaningRev: "Dishonesty" },
  { name: "The Hanged Man", nameCN: "倒吊人", id: "ar12", image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg", meaningUp: "Surrender, perspective", meaningRev: "Stalling" },
  { name: "Death", nameCN: "死神", id: "ar13", image: "
