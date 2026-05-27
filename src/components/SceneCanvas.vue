<script setup lang="ts">
import { resolveAssetPath } from '../domain/assets';
import type { LanguageCode, Level, SceneItem } from '../domain/levelLogic';
import { findItemAtPoint, getLabel } from '../domain/levelLogic';

const props = defineProps<{
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
  const stage = event.currentTarget as HTMLElement;
  const rect = stage.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  const item = findItemAtPoint(props.level, x, y);

  if (item) {
    emit('item', item);
    return;
  }

  emit('miss');
}
</script>

<template>
  <div class="scene-frame">
    <div class="scene-stage" @pointerup="handlePointer">
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
