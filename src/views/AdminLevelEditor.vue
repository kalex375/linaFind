<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { SceneItemRole, TargetArea } from '../domain/levelLogic';

type DraftItem = {
  id: string;
  role: SceneItemRole;
  label: { pt: string; en: string; uk: string };
  showLabelOnImage: boolean;
  targetArea: TargetArea;
  thumbnailSrc?: string;
};

const imageSrc = ref('');
const imageName = ref('');
const stage = ref<HTMLElement>();
const draft = reactive({
  id: '',
  title: { pt: '', en: '', uk: '' },
});
const items = ref<DraftItem[]>([]);
const dragStart = ref<{ x: number; y: number } | undefined>();
const selection = ref<TargetArea | undefined>();

const exportJson = computed(() =>
  JSON.stringify(
    {
      id: draft.id || 'new-level',
      title: draft.title,
      thumbnailSrc: imageName.value,
      imageSrc: imageName.value,
      source: 'built-in',
      items: items.value,
    },
    null,
    2,
  ),
);

function loadImage(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    return;
  }

  imageName.value = file.name;
  imageSrc.value = URL.createObjectURL(file);
}

function pointerToPercent(event: PointerEvent): { x: number; y: number } {
  const rect = stage.value?.getBoundingClientRect();
  if (!rect) {
    return { x: 0, y: 0 };
  }

  return {
    x: Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)),
    y: Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100)),
  };
}

function startSelection(event: PointerEvent): void {
  dragStart.value = pointerToPercent(event);
  selection.value = { x: dragStart.value.x, y: dragStart.value.y, width: 0, height: 0 };
}

function updateSelection(event: PointerEvent): void {
  if (!dragStart.value) {
    return;
  }

  const current = pointerToPercent(event);
  selection.value = {
    x: Math.min(dragStart.value.x, current.x),
    y: Math.min(dragStart.value.y, current.y),
    width: Math.abs(current.x - dragStart.value.x),
    height: Math.abs(current.y - dragStart.value.y),
  };
}

function finishSelection(): void {
  dragStart.value = undefined;
}

function addItem(role: SceneItemRole): void {
  if (!selection.value || selection.value.width < 1 || selection.value.height < 1) {
    return;
  }

  const id = `item-${items.value.length + 1}`;
  items.value.push({
    id,
    role,
    label: { pt: '', en: '', uk: '' },
    showLabelOnImage: true,
    targetArea: { ...selection.value },
  });
}
</script>

<template>
  <main class="admin-screen">
    <header class="top-bar">
      <div>
        <p class="eyebrow">Hidden admin</p>
        <h1>Level editor</h1>
      </div>
      <RouterLink to="/" class="primary-button">Game</RouterLink>
    </header>

    <section class="admin-grid">
      <div class="editor-panel">
        <label>
          Level id
          <input v-model="draft.id" placeholder="bedroom" />
        </label>
        <label>
          PT title
          <input v-model="draft.title.pt" placeholder="Quarto" />
        </label>
        <label>
          EN title
          <input v-model="draft.title.en" placeholder="Bedroom" />
        </label>
        <label>
          UK title
          <input v-model="draft.title.uk" placeholder="Кімната" />
        </label>
        <label>
          Scene image
          <input type="file" accept="image/*" @change="loadImage" />
        </label>

        <div class="editor-actions">
          <button type="button" @click="addItem('search-target')">Add search item</button>
          <button type="button" @click="addItem('learning-only')">Add learning item</button>
        </div>
      </div>

      <div class="editor-workspace">
        <div
          ref="stage"
          class="editor-stage"
          @pointerdown="startSelection"
          @pointermove="updateSelection"
          @pointerup="finishSelection"
        >
          <img v-if="imageSrc" :src="imageSrc" alt="" draggable="false" />
          <div v-else class="empty-stage">Upload a scene image</div>
          <div
            v-if="selection"
            class="selection-box"
            :style="{ left: `${selection.x}%`, top: `${selection.y}%`, width: `${selection.width}%`, height: `${selection.height}%` }"
          />
        </div>
      </div>
    </section>

    <section class="item-editor">
      <article v-for="item in items" :key="item.id" class="item-edit-row">
        <strong>{{ item.id }} · {{ item.role }}</strong>
        <input v-model="item.label.pt" placeholder="pt label" />
        <input v-model="item.label.en" placeholder="en label" />
        <input v-model="item.label.uk" placeholder="uk label" />
        <label class="inline-check">
          <input v-model="item.showLabelOnImage" type="checkbox" />
          label on image
        </label>
      </article>
    </section>

    <section class="export-panel">
      <h2>Export JSON</h2>
      <textarea readonly :value="exportJson" />
    </section>
  </main>
</template>
