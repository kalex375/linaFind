import type { Level } from '../domain/levelLogic';

export const builtInLevels: Level[] = [
  {
    id: 'bedroom',
    title: { pt: 'Quarto', en: 'Bedroom', uk: 'Кімната' },
    thumbnailSrc: '/assets/levels/bedroom/scene.svg',
    imageSrc: '/assets/levels/bedroom/scene.svg',
    source: 'built-in',
    items: [
      { id: 'moon', role: 'search-target', label: { pt: 'lua', en: 'moon', uk: 'місяць' }, showLabelOnImage: true, targetArea: { x: 44, y: 12, width: 11, height: 17 } },
      { id: 'book', role: 'search-target', label: { pt: 'livro', en: 'book', uk: 'книга' }, showLabelOnImage: true, targetArea: { x: 17, y: 66, width: 12, height: 14 } },
      { id: 'ball', role: 'search-target', label: { pt: 'bola', en: 'ball', uk: "м'яч" }, showLabelOnImage: true, targetArea: { x: 36, y: 70, width: 10, height: 12 } },
      { id: 'cubes', role: 'search-target', label: { pt: 'cubos', en: 'blocks', uk: 'кубики' }, showLabelOnImage: true, targetArea: { x: 68, y: 65, width: 13, height: 12 } },
      { id: 'alarm', role: 'search-target', label: { pt: 'despertador', en: 'alarm clock', uk: 'будильник' }, showLabelOnImage: true, targetArea: { x: 83, y: 72, width: 9, height: 14 } },
      { id: 'lamp', role: 'learning-only', label: { pt: 'candeeiro', en: 'lamp', uk: 'лампа' }, showLabelOnImage: true, targetArea: { x: 76, y: 6, width: 10, height: 12 } },
    ],
  },
  {
    id: 'kitchen',
    title: { pt: 'Cozinha', en: 'Kitchen', uk: 'Кухня' },
    thumbnailSrc: '/assets/levels/kitchen/scene.svg',
    imageSrc: '/assets/levels/kitchen/scene.svg',
    source: 'built-in',
    items: [
      { id: 'cup', role: 'search-target', label: { pt: 'copo', en: 'cup', uk: 'чашка' }, showLabelOnImage: true, targetArea: { x: 18, y: 55, width: 9, height: 13 } },
      { id: 'spoon', role: 'search-target', label: { pt: 'colher', en: 'spoon', uk: 'ложка' }, showLabelOnImage: true, targetArea: { x: 32, y: 63, width: 13, height: 6 } },
      { id: 'apple', role: 'search-target', label: { pt: 'maçã', en: 'apple', uk: 'яблуко' }, showLabelOnImage: true, targetArea: { x: 54, y: 52, width: 8, height: 10 } },
      { id: 'pan', role: 'search-target', label: { pt: 'panela', en: 'pan', uk: 'каструля' }, showLabelOnImage: true, targetArea: { x: 66, y: 58, width: 15, height: 12 } },
      { id: 'clock', role: 'search-target', label: { pt: 'relógio', en: 'clock', uk: 'годинник' }, showLabelOnImage: true, targetArea: { x: 80, y: 12, width: 9, height: 13 } },
    ],
  },
  {
    id: 'bathroom',
    title: { pt: 'Casa de banho', en: 'Bathroom', uk: 'Ванна' },
    thumbnailSrc: '/assets/levels/bathroom/scene.svg',
    imageSrc: '/assets/levels/bathroom/scene.svg',
    source: 'built-in',
    items: [
      { id: 'duck', role: 'search-target', label: { pt: 'pato', en: 'duck', uk: 'качка' }, showLabelOnImage: true, targetArea: { x: 58, y: 64, width: 10, height: 10 } },
      { id: 'soap', role: 'search-target', label: { pt: 'sabão', en: 'soap', uk: 'мило' }, showLabelOnImage: true, targetArea: { x: 29, y: 57, width: 9, height: 7 } },
      { id: 'towel', role: 'search-target', label: { pt: 'toalha', en: 'towel', uk: 'рушник' }, showLabelOnImage: true, targetArea: { x: 74, y: 22, width: 12, height: 25 } },
      { id: 'toothbrush', role: 'search-target', label: { pt: 'escova', en: 'brush', uk: 'щітка' }, showLabelOnImage: true, targetArea: { x: 18, y: 36, width: 8, height: 20 } },
      { id: 'mirror', role: 'search-target', label: { pt: 'espelho', en: 'mirror', uk: 'дзеркало' }, showLabelOnImage: true, targetArea: { x: 39, y: 12, width: 20, height: 24 } },
    ],
  },
  {
    id: 'garden',
    title: { pt: 'Jardim', en: 'Garden', uk: 'Сад' },
    thumbnailSrc: '/assets/levels/garden/scene.svg',
    imageSrc: '/assets/levels/garden/scene.svg',
    source: 'built-in',
    items: [
      { id: 'flower', role: 'search-target', label: { pt: 'flor', en: 'flower', uk: 'квітка' }, showLabelOnImage: true, targetArea: { x: 20, y: 58, width: 9, height: 18 } },
      { id: 'butterfly', role: 'search-target', label: { pt: 'borboleta', en: 'butterfly', uk: 'метелик' }, showLabelOnImage: true, targetArea: { x: 48, y: 21, width: 11, height: 10 } },
      { id: 'bucket', role: 'search-target', label: { pt: 'balde', en: 'bucket', uk: 'відро' }, showLabelOnImage: true, targetArea: { x: 66, y: 67, width: 11, height: 13 } },
      { id: 'tree', role: 'search-target', label: { pt: 'árvore', en: 'tree', uk: 'дерево' }, showLabelOnImage: true, targetArea: { x: 77, y: 22, width: 17, height: 47 } },
      { id: 'sun', role: 'search-target', label: { pt: 'sol', en: 'sun', uk: 'сонце' }, showLabelOnImage: true, targetArea: { x: 7, y: 8, width: 12, height: 15 } },
    ],
  },
  {
    id: 'playroom',
    title: { pt: 'Brinquedos', en: 'Playroom', uk: 'Іграшки' },
    thumbnailSrc: '/assets/levels/playroom/scene.svg',
    imageSrc: '/assets/levels/playroom/scene.svg',
    source: 'built-in',
    items: [
      { id: 'train', role: 'search-target', label: { pt: 'comboio', en: 'train', uk: 'поїзд' }, showLabelOnImage: true, targetArea: { x: 15, y: 67, width: 25, height: 13 } },
      { id: 'bear', role: 'search-target', label: { pt: 'urso', en: 'bear', uk: 'ведмедик' }, showLabelOnImage: true, targetArea: { x: 46, y: 43, width: 12, height: 21 } },
      { id: 'drum', role: 'search-target', label: { pt: 'tambor', en: 'drum', uk: 'барабан' }, showLabelOnImage: true, targetArea: { x: 66, y: 61, width: 13, height: 16 } },
      { id: 'kite', role: 'search-target', label: { pt: 'papagaio', en: 'kite', uk: 'повітряний змій' }, showLabelOnImage: true, targetArea: { x: 72, y: 18, width: 14, height: 18 } },
      { id: 'star', role: 'search-target', label: { pt: 'estrela', en: 'star', uk: 'зірка' }, showLabelOnImage: true, targetArea: { x: 29, y: 16, width: 8, height: 10 } },
    ],
  },
];

export function findLevelById(id: string): Level | undefined {
  return builtInLevels.find((level) => level.id === id);
}
