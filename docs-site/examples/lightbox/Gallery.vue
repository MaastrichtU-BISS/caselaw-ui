<script setup lang="ts">
import { ref } from 'vue';
import { BissLightbox, type BissLightboxImage } from 'biss-ui/vue';

/** Placeholder artwork; use your own image URLs. */
const art = (label: string, tint: string) =>
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="${tint}"/><circle cx="930" cy="230" r="120" fill="#fff" opacity=".45"/><path d="M0 640 340 360l260 220 180-140 420 300v60H0z" fill="#fff" opacity=".35"/><text x="80" y="140" font-family="sans-serif" font-size="56" font-weight="600" fill="#1D1C1A" opacity=".7">${label}</text></svg>`,
  );
const images: BissLightboxImage[] = [
  { src: art('Stakeholder workshop', '#BFD5EB'), alt: 'Stakeholder workshop with the courts team', caption: 'Stakeholder workshop with the courts team', credit: 'Photo: Research office' },
  { src: art('Poster session', '#BFE3CF'), alt: 'Poster session at the annual conference', caption: 'Poster session at the annual conference', credit: 'Photo: Grace Hopper' },
  { src: art('Fieldwork', '#F0D27A'), alt: 'Fieldwork at the district court archive', caption: 'Fieldwork at the district court archive' },
  { src: art('Team retreat', '#F1C6BF'), alt: 'Team retreat planning session', caption: 'Team retreat planning session', credit: 'Photo: Ada Lovelace' },
];

const open = ref(true);
const index = ref(0);
function show(i: number) {
  index.value = i;
  open.value = true;
}
</script>

<template>
  <div class="example-thumbs">
    <button
      v-for="(image, i) in images"
      :key="image.src"
      type="button"
      :aria-label="`Open ${image.alt}`"
      @click="show(i)"
    >
      <img :src="image.src" alt="" />
    </button>
  </div>
  <BissLightbox v-model:open="open" v-model:index="index" :images="images" />
</template>

<style scoped>
.example-thumbs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
  width: 100%;
}
.example-thumbs button {
  padding: 0;
  border: 1px solid var(--biss-border);
  border-radius: var(--biss-radius-sm);
  overflow: hidden;
  cursor: zoom-in;
  background: var(--biss-card);
}
.example-thumbs img {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}
</style>
