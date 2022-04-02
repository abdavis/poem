<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue';
import init, { compress, decompress } from './assets/brotli_wasm/wasm_compress';
let lines = ref();
const default_lines = [
  "Experience suggests beggining, middle, end. But maybe...",
  "What if first became last, and last was first?",
  "Can everything happen all at once?",
  "Can you imagine a world where order is void?",
  "Nothing makes sense without sequence, right?"
];

const test_lines = [
  "lorem ispum sit amet",
  "here is a string of random words",
  "and again, some nonsense for you to read",
  "the quick brown fox jumped over the lazy dog"
]

//load wasm file first, then we can decompress hash
init().then(() => {
  try {
    lines.value = JSON.parse(decompress(location.hash.slice(1)));
  } catch {
    lines.value = default_lines;
  }
  shuffle(lines.value);
  shuffle(lines.value);
});


function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}
</script>

<template>
  <TransitionGroup name="poem">
    <p v-for="line in lines" :key="line">{{ line }}</p>
  </TransitionGroup>
  <button @click="shuffle(lines)">Shuffle</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.poem-move {
  transition: all 1.5s ease;
}
</style>
