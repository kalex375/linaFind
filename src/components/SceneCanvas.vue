<script setup lang="ts">
import { resolveAssetPath } from '../domain/assets';
import type { LanguageCode, Level, SceneItem } from '../domain/levelLogic';
import { getLabel } from '../domain/levelLogic';

defineProps<{
  level: Level;
  language: LanguageCode;
  lastTouchedItem?: SceneItem;
  showDebugAreas?: boolean;
  showLabels?: boolean;
}>();

const emit = defineEmits<{
  item: [item: SceneItem];
  miss: [];
}>();

function handlePointer(event: PointerEvent): void {
  const image = event.currentTarget as HTMLElement;
  const rect = image.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  const item = (image as HTMLElement).__levelItems?.find((candidate) => {
    const area = candidate.targetArea;
    return x >= area.x && x <= area.x + area.width && y >= area.y && y <= area.y + area.height;
  });

  if (item) {
    emit('item', item);
    return;
  }

  emit('miss');
}
</script>

<script lang="ts">
import type { SceneItem as SceneCanvasItem } from '../domain/levelLogic';

declare global {
  interface HTMLElement {
    __levelItems?: SceneCanvasItem[];
  }
}
</script>

<template>
  <div class="scene-frame">
    <div class="scene-stage" :ref="(el) => { if (el) (el as HTMLElement).__levelItems = level.items; }" @pointerup="handlePointer">
      <img class="scene-image" :src="resolveAssetPath(level.imageSrc)" :alt="getLabel(level.title, language)" draggable="false" />
      <div
        v-for="item in showDebugAreas ? level.items : []"
        :key="`debug-${item.id}`"
        class="debug-target-area"
        :class="item.role"
        :style="{
          left: `${item.targetArea.x}%`,
          top: `${item.targetArea.y}%`,
          width: `${item.targetArea.width}%`,
          height: `${item.targetArea.height}%`,
        }"
        aria-hidden="true"
      >
        {{ item.id }}
      </div>
      <button
        v-for="item in showLabels === false ? [] : level.items.filter((entry) => entry.showLabelOnImage)"
        :key="item.id"
        type="button"
        class="scene-label"
        :class="{ touched: lastTouchedItem?.id === item.id }"
        :style="{ left: `${item.targetArea.x}%`, top: `${item.targetArea.y + item.targetArea.height}%` }"
        @pointerup.stop="emit('item', item)"
      >
        {{ getLabel(item.label, language) }}
      </button>
    </div>
  </div>
</template>
