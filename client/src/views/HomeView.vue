<template>
  <div>
    <div class="title">Home</div>
    <div class="q-mt-md text-center">
      <img src="/AudioArchive_Logo.svg" />
      <h4>Welcome!</h4>
      <p>To begin recording, just press the microphone bubble below.</p>
      <p>Afterwards, you may give your recording a title, description, and a rating.</p>
      <RecordingCompVue @recording-complete="promptSave" />
    </div>
    <q-dialog v-model="saveDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Add Recording Details</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <AVWaveform :src="audioURL" :canv-width="300" noplayed-line-color="#7BADE2" played-line-color="#5049CB" />

          <q-form class="q-gutter-md">
            <q-input
              filled
              v-model="audioName"
              label="Audio Title"
              :rules="[val => (val && val.length > 0) || 'Please enter a title']"
            />

            <q-input filled autogrow v-model="audioDescription" label="Audio Description" />

            <q-rating v-model="audioRating" size="2em" />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn glossy label="Save" color="primary" @click="saveAudio()" />
          <q-btn flat label="Cancel" color="primary" @click="cancelAudio()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="cancelConfirmation" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Are you sure you want to cancel?</div>
        </q-card-section>

        <q-card-section class="q-pt-none"> Your recording will be lost. </q-card-section>

        <q-card-actions align="right">
          <q-btn glossy label="Yes" color="primary" @click="ultimatelyCancel()" />
          <q-btn flat label="No" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useAudioStore from '@/stores/audioStore.js'
import RecordingCompVue from '@/components/RecordingComp.vue'
import { AVWaveform } from 'vue-audio-visual'

const audioStore = useAudioStore()

const audioURL = ref('')
const audioTimeStamp = ref('')
const audioMimeType = ref('')
const audioBlob = ref('')

const audioName = ref('')
const audioDescription = ref('')
const audioRating = ref(0)

const saveDialog = ref(false)
const cancelConfirmation = ref(false)

const promptSave = ({ url, name, timeStamp, blob, mimeType }) => {
  audioURL.value = url
  audioName.value = name
  audioTimeStamp.value = timeStamp
  audioBlob.value = blob
  audioMimeType.value = mimeType
  saveDialog.value = true
}

const resetFields = () => {
  audioName.value = ''
  audioDescription.value = ''
  audioRating.value = 0

  audioURL.value = ''
  audioTimeStamp.value = ''
  audioMimeType.value = ''
  audioBlob.value = ''
}

const saveAudio = async () => {
  audioStore.addAudio(
    audioName.value,
    audioDescription.value,
    audioRating.value,
    audioTimeStamp.value,
    audioBlob.value,
    audioMimeType.value
  )
  saveDialog.value = false
  resetFields()
}

const cancelAudio = () => {
  cancelConfirmation.value = true
}

const ultimatelyCancel = () => {
  cancelConfirmation.value = false
  saveDialog.value = false
  resetFields()
}
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
