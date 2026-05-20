<script setup lang="ts">
import { computed } from 'vue';
import type { Level, SceneItem } from '../domain/levelLogic';

const props = defineProps<{
  level: Level;
  item: SceneItem;
}>();

const cropStyle = computed(() => {
  const area = props.item.targetArea;

  if (props.item.thumbnailSrc) {
    return {
      backgroundImage: `url(${props.item.thumbnailSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  return {
    backgroundImage: `url(${props.level.imageSrc})`,
    backgroundSize: `${10000 / area.width}% ${10000 / area.height}%`,
    backgroundPosition: `${area.x}% ${area.y}%`,
  };
});
</script>

<template>
  <div class="item-thumbnail" :style="cropStyle" aria-hidden="true" />
</template>
