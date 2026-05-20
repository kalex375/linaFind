import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import type { Level } from '../../domain/levelLogic';
import SceneCanvas from '../SceneCanvas.vue';

const level: Level = {
  id: 'debug',
  title: { pt: 'Debug', en: 'Debug', uk: 'Debug' },
  thumbnailSrc: '/debug.png',
  imageSrc: '/debug.png',
  source: 'built-in',
  items: [
    {
      id: 'cup',
      role: 'search-target',
      label: { pt: 'copo', en: 'cup', uk: 'чашка' },
      showLabelOnImage: true,
      targetArea: { x: 10, y: 20, width: 15, height: 12 },
    },
    {
      id: 'plant',
      role: 'learning-only',
      label: { pt: 'planta', en: 'plant', uk: 'рослина' },
      showLabelOnImage: false,
      targetArea: { x: 70, y: 5, width: 9, height: 18 },
    },
  ],
};

describe('SceneCanvas', () => {
  it('can hide item labels while keeping the scene interactive', () => {
    const wrapper = mount(SceneCanvas, {
      props: {
        language: 'en',
        level,
        showLabels: false,
      },
    });

    expect(wrapper.findAll('.scene-label')).toHaveLength(0);
    expect(wrapper.find('.scene-stage').exists()).toBe(true);
  });

  it('hides clickable debug areas by default', () => {
    const wrapper = mount(SceneCanvas, {
      props: {
        language: 'en',
        level,
      },
    });

    expect(wrapper.findAll('.debug-target-area')).toHaveLength(0);
  });

  it('renders clickable debug areas without changing item labels', () => {
    const wrapper = mount(SceneCanvas, {
      props: {
        language: 'en',
        level,
        showDebugAreas: true,
      },
    });

    const areas = wrapper.findAll('.debug-target-area');

    expect(areas).toHaveLength(2);
    expect(areas[0].classes()).toContain('search-target');
    expect(areas[0].attributes('style')).toContain('left: 10%');
    expect(areas[0].attributes('style')).toContain('top: 20%');
    expect(areas[0].attributes('style')).toContain('width: 15%');
    expect(areas[0].attributes('style')).toContain('height: 12%');
    expect(areas[0].text()).toBe('cup');
    expect(areas[1].classes()).toContain('learning-only');
    expect(areas[1].text()).toBe('plant');
  });
});
