<template>
  <div class="text-center">
    <p class="text-bold text-h4 q-mb-lg">{{ title }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
});
</script>
