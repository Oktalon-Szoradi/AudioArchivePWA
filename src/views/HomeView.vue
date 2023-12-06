<template>
  <div>
    <div class="title">Home</div>
    <div class="q-mt-md text-center">
      <img src="@/assets/img/AudioArchive_Logo.svg" />
      <h4>Welcome!</h4>
      <p>To begin recording, just press the microphone bubble below.</p>
      <p>Afterwards, you may give your recording a title, description, and a rating.</p>
    </div>
  </div>
</template>

<script setup>
import useDefaultStore from '@/stores/defaultStore.js'

const store = useDefaultStore()

const increaseCounter = () => store.increaseCounter()
</script>

<style scoped>
* {
  color: #3d1a78;
}
img {
  width: 50vw;
  max-width: 256px;
  height: auto;
}
</style>
