import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LanguageSwitcher from '../LanguageSwitcher.vue';

describe('LanguageSwitcher', () => {
  it('renders fixed flag images for every language option', () => {
    const wrapper = mount(LanguageSwitcher, {
      props: {
        language: 'pt',
      },
    });

    const flags = wrapper.findAll('.language-flag');

    expect(flags).toHaveLength(3);
    expect(flags.map((flag) => flag.attributes('src'))).toEqual([
      '/assets/flags/pt.svg',
      '/assets/flags/gb.svg',
      '/assets/flags/ua.svg',
    ]);
    expect(wrapper.text()).toBe('');
  });
});
