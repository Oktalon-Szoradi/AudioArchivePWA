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
      <q-card-section>
        AudioArchive is a work-in-progress Progressive Web App (PWA) for recording,
        uploading, and converting audio.<br />
      </q-card-section>
      <q-card-section>
        <a href="https://github.com/Oktalon-Szoradi/AudioArchivePWA" target="_blank">
          GitHub Repository
        </a>
      </q-card-section>
    </q-card>
    <q-card class="text-center q-ma-md">
      <q-card-section>
        <b>Fonts</b>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-card class="text-center weak-card">
          <q-card-section> Main font: <b>Oxygen</b> </q-card-section>
          <q-separator />
          <q-card-section>
            Copyright &copy; 2012, vernon adams (vern@newtypography.co.uk), with Reserved
            Font Names 'Oxygen'<br />
            This Font Software is licensed under the SIL Open Font License, Version 1.1.
          </q-card-section>
          <q-card-section>
            <a href="/Oxygen_OFL.txt" target="_blank" style="word-break: break-all">
              Read the license
            </a>
            <br />
            Obtained from
            <a href="https://fonts.google.com/specimen/Oxygen" target="_blank">
              Google Fonts
            </a>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section>
        <q-card class="text-center weak-card">
          <q-card-section> Timer/Stopwatch font: <b>E1234</b> </q-card-section>
          <q-separator />
          <q-card-section>
            Copyright &copy; 2020 GGBot, with Reserved Font Name "E1234".<br />
            This Font Software is licensed under the SIL Open Font License, Version 1.1.
          </q-card-section>
          <q-card-section>
            <a href="/E1234_License.txt" target="_blank" style="word-break: break-all">
              Read the license
            </a>
            <br />
            Obtained from
            <a href="https://www.1001fonts.com/e1234-font.html" target="_blank">
              1001 Fonts
            </a>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
    <q-card class="text-center q-ma-md">
      <q-card-section>
        <b>Audio Visualizations</b>
      </q-card-section>
      <q-separator />
      <q-card-section>
        by Stas Kobzar<br />
        <a href="https://github.com/staskobzar/vue-audio-visual" target="_blank">
          https://github.com/staskobzar/vue-audio-visual
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
          style="word-break: break-all"
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

.weak-card {
  box-shadow: 0 2px 4px hsla(211deg 64% 95% / 50%),
    inset 0 0 8px hsla(211deg 64% 25% / 25%);
  background-color: hsla(211deg 64% 40% / 15%);
}
</style>
