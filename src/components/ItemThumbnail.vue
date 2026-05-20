<script setup lang="ts">
import { computed } from 'vue';
import type { Level, SceneItem } from '../domain/levelLogic';
import { getThumbnailArea, getThumbnailCropStyle } from '../domain/levelLogic';

const props = defineProps<{
  level: Level;
  item: SceneItem;
}>();

const cropStyle = computed(() => {
  if (props.item.thumbnailSrc) {
    return {
      backgroundImage: `url(${props.item.thumbnailSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  return getThumbnailCropStyle(props.level.imageSrc, getThumbnailArea(props.item));
});
</script>

<template>
  <div class="item-thumbnail" :style="cropStyle" aria-hidden="true" />
</template>
