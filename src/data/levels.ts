import type { Level } from '../domain/levelLogic';

export const builtInLevels: Level[] = [
  {
    id: 'ai-kitchen',
    title: { pt: 'Cozinha alegre', en: 'Sunny kitchen', uk: 'Сонячна кухня' },
    thumbnailSrc: '/assets/levels/ai-kitchen/scene.png',
    imageSrc: '/assets/levels/ai-kitchen/scene.png',
    source: 'ai',
    items: [
      { id: 'cup', role: 'search-target', label: { pt: 'copo', en: 'cup', uk: 'чашка' }, showLabelOnImage: true, targetArea: { x: 26, y: 61, width: 11, height: 15 }, thumbnailArea: { x: 26, y: 60, width: 11, height: 16 }, thumbnailSrc: '/assets/levels/ai-kitchen/thumbs/cup.png' },
      { id: 'spoon', role: 'search-target', label: { pt: 'colher', en: 'spoon', uk: 'ложка' }, showLabelOnImage: true, targetArea: { x: 38, y: 70, width: 15, height: 9 }, thumbnailArea: { x: 38, y: 70, width: 15, height: 9 }, thumbnailSrc: '/assets/levels/ai-kitchen/thumbs/spoon.png' },
      { id: 'apple', role: 'search-target', label: { pt: 'maçã', en: 'apple', uk: 'яблуко' }, showLabelOnImage: true, targetArea: { x: 40, y: 53, width: 9, height: 14 }, thumbnailArea: { x: 40, y: 52, width: 10, height: 15 }, thumbnailSrc: '/assets/levels/ai-kitchen/thumbs/apple.png' },
      { id: 'pot', role: 'search-target', label: { pt: 'panela', en: 'pot', uk: 'каструля' }, showLabelOnImage: true, targetArea: { x: 59, y: 50, width: 18, height: 19 }, thumbnailArea: { x: 59, y: 50, width: 19, height: 20 }, thumbnailSrc: '/assets/levels/ai-kitchen/thumbs/pot.png' },
      { id: 'clock', role: 'search-target', label: { pt: 'relógio', en: 'clock', uk: 'годинник' }, showLabelOnImage: true, targetArea: { x: 80, y: 5, width: 12, height: 18 }, thumbnailArea: { x: 80, y: 4, width: 12, height: 19 }, thumbnailSrc: '/assets/levels/ai-kitchen/thumbs/clock.png' },
      { id: 'banana', role: 'learning-only', label: { pt: 'banana', en: 'banana', uk: 'банан' }, showLabelOnImage: true, targetArea: { x: 80, y: 59, width: 12, height: 13 } },
      { id: 'plate', role: 'learning-only', label: { pt: 'prato', en: 'plate', uk: 'тарілка' }, showLabelOnImage: true, targetArea: { x: 57, y: 70, width: 20, height: 12 } },
      { id: 'kettle', role: 'learning-only', label: { pt: 'chaleira', en: 'kettle', uk: 'чайник' }, showLabelOnImage: true, targetArea: { x: 18, y: 33, width: 10, height: 12 } },
      { id: 'chair', role: 'learning-only', label: { pt: 'cadeira', en: 'chair', uk: 'стілець' }, showLabelOnImage: true, targetArea: { x: 3, y: 53, width: 20, height: 47 } },
    ],
  },
  {
    id: 'ai-bedroom',
    title: { pt: 'Quarto solarengo', en: 'Sunny bedroom', uk: 'Сонячна спальня' },
    thumbnailSrc: '/assets/levels/ai-bedroom/scene.png',
    imageSrc: '/assets/levels/ai-bedroom/scene.png',
    source: 'ai',
    items: [
      { id: 'moon', role: 'search-target', label: { pt: 'lua', en: 'moon', uk: 'місяць' }, showLabelOnImage: true, targetArea: { x: 18, y: 2, width: 15, height: 21 }, thumbnailSrc: '/assets/levels/ai-bedroom/thumbs/moon.png' },
      { id: 'book', role: 'search-target', label: { pt: 'livro', en: 'book', uk: 'книга' }, showLabelOnImage: true, targetArea: { x: 34, y: 70, width: 22, height: 17 }, thumbnailSrc: '/assets/levels/ai-bedroom/thumbs/book.png' },
      { id: 'ball', role: 'search-target', label: { pt: 'bola', en: 'ball', uk: "м'яч" }, showLabelOnImage: true, targetArea: { x: 48, y: 86, width: 12, height: 14 }, thumbnailSrc: '/assets/levels/ai-bedroom/thumbs/ball.png' },
      { id: 'blocks', role: 'search-target', label: { pt: 'cubos', en: 'blocks', uk: 'кубики' }, showLabelOnImage: true, targetArea: { x: 59, y: 70, width: 19, height: 19 }, thumbnailSrc: '/assets/levels/ai-bedroom/thumbs/blocks.png' },
      { id: 'alarm', role: 'search-target', label: { pt: 'despertador', en: 'alarm clock', uk: 'будильник' }, showLabelOnImage: true, targetArea: { x: 80, y: 66, width: 15, height: 27 }, thumbnailSrc: '/assets/levels/ai-bedroom/thumbs/alarm.png' },
      { id: 'lamp', role: 'learning-only', label: { pt: 'candeeiro', en: 'lamp', uk: 'лампа' }, showLabelOnImage: true, targetArea: { x: 0, y: 28, width: 12, height: 25 } },
      { id: 'slippers', role: 'learning-only', label: { pt: 'pantufas', en: 'slippers', uk: 'капці' }, showLabelOnImage: true, targetArea: { x: 3, y: 78, width: 18, height: 18 } },
      { id: 'bear', role: 'learning-only', label: { pt: 'urso', en: 'bear', uk: 'ведмедик' }, showLabelOnImage: true, targetArea: { x: 86, y: 44, width: 12, height: 24 } },
    ],
  },
  {
    id: 'ai-bathroom',
    title: { pt: 'Casa de banho solarenga', en: 'Sunny bathroom', uk: 'Сонячна ванна' },
    thumbnailSrc: '/assets/levels/ai-bathroom/scene.png',
    imageSrc: '/assets/levels/ai-bathroom/scene.png',
    source: 'ai',
    items: [
      { id: 'duck', role: 'search-target', label: { pt: 'pato', en: 'duck', uk: 'качка' }, showLabelOnImage: true, targetArea: { x: 6, y: 77, width: 18, height: 17 }, thumbnailSrc: '/assets/levels/ai-bathroom/thumbs/duck.png' },
      { id: 'soap', role: 'search-target', label: { pt: 'sabão', en: 'soap', uk: 'мило' }, showLabelOnImage: true, targetArea: { x: 31, y: 78, width: 17, height: 12 }, thumbnailSrc: '/assets/levels/ai-bathroom/thumbs/soap.png' },
      { id: 'towel', role: 'search-target', label: { pt: 'toalha', en: 'towel', uk: 'рушник' }, showLabelOnImage: true, targetArea: { x: 52, y: 30, width: 13, height: 33 }, thumbnailSrc: '/assets/levels/ai-bathroom/thumbs/towel.png' },
      { id: 'toothbrush', role: 'search-target', label: { pt: 'escova', en: 'brush', uk: 'щітка' }, showLabelOnImage: true, targetArea: { x: 56, y: 63, width: 8, height: 24 }, thumbnailSrc: '/assets/levels/ai-bathroom/thumbs/toothbrush.png' },
      { id: 'mirror', role: 'search-target', label: { pt: 'espelho', en: 'mirror', uk: 'дзеркало' }, showLabelOnImage: true, targetArea: { x: 69, y: 5, width: 21, height: 32 }, thumbnailSrc: '/assets/levels/ai-bathroom/thumbs/mirror.png' },
      { id: 'bathtub', role: 'learning-only', label: { pt: 'banheira', en: 'bathtub', uk: 'ванна' }, showLabelOnImage: true, targetArea: { x: 2, y: 43, width: 44, height: 27 } },
      { id: 'sink', role: 'learning-only', label: { pt: 'lavatório', en: 'sink', uk: 'раковина' }, showLabelOnImage: true, targetArea: { x: 66, y: 43, width: 20, height: 31 } },
      { id: 'mat', role: 'learning-only', label: { pt: 'tapete', en: 'mat', uk: 'килимок' }, showLabelOnImage: true, targetArea: { x: 64, y: 80, width: 24, height: 15 } },
    ],
  },
  {
    id: 'ai-garden',
    title: { pt: 'Jardim solarengo', en: 'Sunny garden', uk: 'Сонячний сад' },
    thumbnailSrc: '/assets/levels/ai-garden/scene.png',
    imageSrc: '/assets/levels/ai-garden/scene.png',
    source: 'ai',
    items: [
      { id: 'flower', role: 'search-target', label: { pt: 'flor', en: 'flower', uk: 'квітка' }, showLabelOnImage: true, targetArea: { x: 9, y: 68, width: 15, height: 28 }, thumbnailSrc: '/assets/levels/ai-garden/thumbs/flower.png' },
      { id: 'butterfly', role: 'search-target', label: { pt: 'borboleta', en: 'butterfly', uk: 'метелик' }, showLabelOnImage: true, targetArea: { x: 50, y: 20, width: 10, height: 16 }, thumbnailSrc: '/assets/levels/ai-garden/thumbs/butterfly.png' },
      { id: 'bucket', role: 'search-target', label: { pt: 'balde', en: 'bucket', uk: 'відро' }, showLabelOnImage: true, targetArea: { x: 25, y: 75, width: 12, height: 15 }, thumbnailSrc: '/assets/levels/ai-garden/thumbs/bucket.png' },
      { id: 'tree', role: 'search-target', label: { pt: 'árvore', en: 'tree', uk: 'дерево' }, showLabelOnImage: true, targetArea: { x: 0, y: 0, width: 49, height: 64 }, thumbnailSrc: '/assets/levels/ai-garden/thumbs/tree.png' },
      { id: 'sun', role: 'search-target', label: { pt: 'sol', en: 'sun', uk: 'сонце' }, showLabelOnImage: true, targetArea: { x: 68, y: 3, width: 16, height: 24 }, thumbnailSrc: '/assets/levels/ai-garden/thumbs/sun.png' },
      { id: 'watering-can', role: 'learning-only', label: { pt: 'regador', en: 'watering can', uk: 'лійка' }, showLabelOnImage: true, targetArea: { x: 53, y: 69, width: 19, height: 17 } },
      { id: 'bench', role: 'learning-only', label: { pt: 'banco', en: 'bench', uk: 'лавка' }, showLabelOnImage: true, targetArea: { x: 62, y: 47, width: 22, height: 18 } },
      { id: 'shovel', role: 'learning-only', label: { pt: 'pá', en: 'shovel', uk: 'лопата' }, showLabelOnImage: true, targetArea: { x: 76, y: 72, width: 17, height: 23 } },
    ],
  },
  {
    id: 'ai-playroom',
    title: { pt: 'Brinquedos solarengos', en: 'Sunny playroom', uk: 'Сонячна ігрова' },
    thumbnailSrc: '/assets/levels/ai-playroom/scene.png',
    imageSrc: '/assets/levels/ai-playroom/scene.png',
    source: 'ai',
    items: [
      { id: 'train', role: 'search-target', label: { pt: 'comboio', en: 'train', uk: 'поїзд' }, showLabelOnImage: true, targetArea: { x: 3, y: 72, width: 32, height: 20 }, thumbnailSrc: '/assets/levels/ai-playroom/thumbs/train.png' },
      { id: 'bear', role: 'search-target', label: { pt: 'urso', en: 'bear', uk: 'ведмедик' }, showLabelOnImage: true, targetArea: { x: 23, y: 25, width: 20, height: 36 }, thumbnailSrc: '/assets/levels/ai-playroom/thumbs/bear.png' },
      { id: 'drum', role: 'search-target', label: { pt: 'tambor', en: 'drum', uk: 'барабан' }, showLabelOnImage: true, targetArea: { x: 36, y: 59, width: 20, height: 20 }, thumbnailSrc: '/assets/levels/ai-playroom/thumbs/drum.png' },
      { id: 'kite', role: 'search-target', label: { pt: 'papagaio', en: 'kite', uk: 'повітряний змій' }, showLabelOnImage: true, targetArea: { x: 57, y: 47, width: 18, height: 24 }, thumbnailSrc: '/assets/levels/ai-playroom/thumbs/kite.png' },
      { id: 'star', role: 'search-target', label: { pt: 'estrela', en: 'star', uk: 'зірка' }, showLabelOnImage: true, targetArea: { x: 48, y: 6, width: 14, height: 17 }, thumbnailSrc: '/assets/levels/ai-playroom/thumbs/star.png' },
      { id: 'car', role: 'learning-only', label: { pt: 'carro', en: 'car', uk: 'машинка' }, showLabelOnImage: true, targetArea: { x: 62, y: 75, width: 15, height: 16 } },
      { id: 'crayons', role: 'learning-only', label: { pt: 'lápis', en: 'crayons', uk: 'олівці' }, showLabelOnImage: true, targetArea: { x: 76, y: 71, width: 12, height: 20 } },
      { id: 'rings', role: 'learning-only', label: { pt: 'argolas', en: 'rings', uk: 'пірамідка' }, showLabelOnImage: true, targetArea: { x: 86, y: 62, width: 12, height: 23 } },
    ],
  },
];

export function findLevelById(id: string): Level | undefined {
  return builtInLevels.find((level) => level.id === id);
}
