import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import type { Level, SceneItem } from '../../domain/levelLogic';
import ItemThumbnail from '../ItemThumbnail.vue';

const level: Level = {
  id: 'sample',
  title: { pt: 'Amostra', en: 'Sample', uk: 'Зразок' },
  thumbnailSrc: '/assets/levels/sample/scene.png',
  imageSrc: '/assets/levels/sample/scene.png',
  source: 'built-in',
  items: [],
};

const item: SceneItem = {
  id: 'cup',
  role: 'search-target',
  label: { pt: 'copo', en: 'cup', uk: 'чашка' },
  showLabelOnImage: true,
  targetArea: { x: 20, y: 30, width: 10, height: 12 },
};

describe('ItemThumbnail', () => {
  it('renders transparent object thumbnail assets as images when present', () => {
    const wrapper = mount(ItemThumbnail, {
      props: {
        level,
        item: {
          ...item,
          thumbnailSrc: '/assets/levels/sample/thumbs/cup.png',
        },
      },
    });

    const image = wrapper.get('img.object-thumbnail');

    expect(image.attributes('src')).toBe('/assets/levels/sample/thumbs/cup.png');
    expect(image.attributes('alt')).toBe('');
    expect(wrapper.attributes('style') ?? '').not.toContain('background-image');
  });

  it('keeps cropped scene fallback when no object thumbnail asset exists', () => {
    const wrapper = mount(ItemThumbnail, {
      props: {
        level,
        item,
      },
    });

    expect(wrapper.find('img.object-thumbnail').exists()).toBe(false);
    expect(wrapper.attributes('style')).toContain('/assets/levels/sample/scene.png');
    expect(wrapper.attributes('style')).toContain('background-image');
  });
});
