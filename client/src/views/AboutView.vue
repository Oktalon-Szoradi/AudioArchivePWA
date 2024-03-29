<template>
  <div>
    <div class="title">about</div>
    <q-card class="text-center q-ma-md">
      <q-card-section>
        <b>{{ audioStore.pwaTitle }}</b>
      </q-card-section>
      <q-separator />
      <q-card-section>
        Oktalon Sz&oacute;r&aacute;di<br />
        5CHITM<br />
        HTL Wien West<br />
        2023/2024
      </q-card-section>
      <q-card-section> This is still a work-in-progress. </q-card-section>
      <q-card-section>
        <a href="https://github.com/Oktalon-Szoradi/AudioArchivePWA" target="_blank">
          GitHub Repository
        </a>
      </q-card-section>
    </q-card>
    <q-card class="text-center q-ma-md">
      <q-card-section>
        <b>RetroArch Menu Ribbon Like PS3</b>
      </q-card-section>
      <q-separator />
      <q-card-section>
        by Haxtir on CodePen<br />
        <a href="https://codepen.io/haxtir/pen/YMJLLZ" target="_blank">
          https://codepen.io/haxtir/pen/YMJLLZ
        </a>
      </q-card-section>
    </q-card>
    <q-card class="text-center q-ma-md">
      <q-card-section>
        <b>External Link Icon</b>
      </q-card-section>
      <q-separator />
      <q-card-section>
        from Wikipedia<br />
        To indicate links with a target of "_blank" (open in new tab).<br />
        <a
          href="https://en.wikipedia.org/w/skins/Vector/resources/skins.vector.styles/images/link-external-small-ltr-progressive.svg"
          target="_blank"
        >
          https://en.wikipedia.org/w/skins/Vector/resources/skins.vector.styles/images/link-external-small-ltr-progressive.svg
        </a>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import useaudioStore from '@/stores/audioStore.js'

const audioStore = useaudioStore()
</script>

<style scoped>
* {
  color: #3d1a78;
}

.q-card {
  background-color: hsla(211deg 64% 95% / 50%);
}
</style>
