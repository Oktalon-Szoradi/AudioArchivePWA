<template>
  <div>
    <div class="title">settings</div>
    <div class="q-mt-xl text-center">
      <q-card>
        <q-card-section> There are no settings available yet. </q-card-section>
        <!-- <q-card-section> Current settings non-functional. </q-card-section>
        <q-card-section class="row items-center">
          <p>Select your preferred audio format/extension for downloading:</p>
          <q-btn-dropdown class="q-ma-md" glossy color="primary" :label="audioStore.preferredAudioFormat">
            <q-list>
              <q-item
                v-for="ext of audioFormats"
                clickable
                v-close-popup
                @click="audioStore.preferredAudioFormat = ext"
              >
                <q-item-section>
                  <q-item-label>{{ ext }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-card-section> -->
      </q-card>
    </div>
  </div>
</template>

<script setup>
import useAudioStore from '@/stores/audioStore.js'

const audioStore = useAudioStore()

const audioFormats = ['.mp3', '.wav', '.ogg', '.flac']
</script>

<style scoped>
* {
  color: #3d1a78;
}

.q-card {
  background-color: hsla(211deg 64% 95% / 50%);
}
</style>
