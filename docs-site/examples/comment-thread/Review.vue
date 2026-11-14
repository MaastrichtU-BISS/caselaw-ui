<script setup lang="ts">
import { ref } from 'vue';
import { BissCommentThread, type BissComment } from 'biss-ui/vue';

const comments = ref<BissComment[]>([
  { id: 'c1', author: 'Marco Rossi', time: 'Yesterday, 16:20', body: 'The sampling section needs the exclusion criteria for pre-2010 judgments.' },
  { id: 'c2', author: 'Lena Vos', time: 'Today, 09:05', body: 'Added them under 3.2. Can you check the wording?' },
]);
const resolved = ref(false);

function post(body: string) {
  comments.value = [...comments.value, { id: `c${comments.value.length + 1}`, author: 'You', time: 'Just now', body }];
}
</script>

<template>
  <BissCommentThread
    label="Methods, section 3.2"
    :items="comments"
    :resolved="resolved"
    @comment="post"
    @resolve="resolved = $event"
  />
</template>
