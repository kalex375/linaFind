<script setup lang="ts">
import { computed } from 'vue';
import { resolveAssetPath } from '../domain/assets';
import type { Level, SceneItem } from '../domain/levelLogic';
import { getThumbnailArea, getThumbnailCropStyle } from '../domain/levelLogic';

const props = defineProps<{
  level: Level;
  item: SceneItem;
}>();

const cropStyle = computed(() => {
  if (props.item.thumbnailSrc) {
    return {};
  }

  return getThumbnailCropStyle(props.level.imageSrc, getThumbnailArea(props.item));
});
</script>

<template>
  <div class="item-thumbnail" :style="cropStyle" aria-hidden="true">
    <img v-if="item.thumbnailSrc" class="object-thumbnail" :src="resolveAssetPath(item.thumbnailSrc)" alt="" draggable="false" />
  </div>
</template>
