import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CompleteBanner from '../CompleteBanner.vue';

describe('CompleteBanner', () => {
  it('emits dismiss when the completion message is clicked', async () => {
    const wrapper = mount(CompleteBanner, {
      props: {
        language: 'pt',
      },
    });

    await wrapper.get('[role="status"]').trigger('click');

    expect(wrapper.emitted('dismiss')).toHaveLength(1);
  });
});
