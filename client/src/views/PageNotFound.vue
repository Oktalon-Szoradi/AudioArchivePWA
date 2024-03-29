<template>
  <div>
    <div class="title">not found</div>
    <div class="q-mt-xl text-center">
      <h4>Looking for <b>{{ $route.fullPath }}</b>?</h4>
      <h5>I ain't got such a page.</h5>
      <q-btn to="/" glossy push color="primary" label="Go Home" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
* {
  color: #3d1a78;
}
</style>
