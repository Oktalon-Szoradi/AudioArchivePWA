<template>
  <div>
    <div class="title">Home</div>
    <div class="q-mt-md text-center">
      <img src="/AudioArchive_Logo.svg" />
      <h4>Welcome!</h4>
      <p>To begin recording, just press the microphone bubble below.</p>
      <p>Afterwards, you may give your recording a title, description, and a rating.</p>
      <div class="q-mt-xl row justify-center">
        <div
          class="microphone-bubble"
          :class="mediaRecorderState !== 'inactive' ? 'microphone-bubble-active' : ''"
          @click="toggleRecording()"
        >
          <q-icon name="mic" color="white" size="5em" />
        </div>
      </div>
      {{ mediaRecorderState }}
    </div>
    <q-dialog v-model="saveDialog" persistent>
      <q-card style="width: 50%">
        <q-card-section>
          <div class="text-h6">Add Recording Details</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <audio :src="audioURL" controls />

          <q-form class="q-gutter-md">
            <q-input
              filled
              v-model="audioName"
              label="Audio Title"
              :rules="[val => (val && val.length > 0) || 'Please enter a title']"
            />

            <q-input filled autogrow v-model="audioDescription" label="Audio Description" />

            <q-rating v-model="audioRating" />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Save" color="primary" @click="saveAudio()" />
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
          <q-btn label="Yes" color="primary" @click="ultimatelyCancel()" />
          <q-btn flat label="No" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useAudioStore from '@/stores/audioStore.js'

const audioStore = useAudioStore()

let mediaRecorder,
  chunks = [],
  audioURL = ''

const mediaRecorderState = ref('inactive')
const blob = ref(null)

const timeStamp = ref(new Date())

const saveDialog = ref(false)
const cancelConfirmation = ref(false)

const audioName = ref('')
const audioDescription = ref('')
const audioRating = ref(0)

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({
      audio: true
    })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data)
        console.log(e)
      }

      mediaRecorder.onstop = async () => {
        timeStamp.value = new Date()
        audioName.value = `Recording on ${timeStamp.value.toISOString()}`
        blob.value = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
        chunks = []
        audioURL = window.URL.createObjectURL(blob.value)
        saveDialog.value = true
      }
    })
    .catch(error => {
      console.error('navigator.mediaDevices ran into an error:', error)
    })
}

const toggleRecording = () => {
  if (mediaRecorder.state === 'inactive') {
    mediaRecorder.start()
    console.info('Recording started')
  } else {
    mediaRecorder.stop()
    console.info('Recording stopped')
  }
  mediaRecorderState.value = mediaRecorder.state
}

const saveAudio = async () => {
  audioStore.addAudio(audioName.value, audioDescription.value, audioRating.value, timeStamp.value, blob.value)
  saveDialog.value = false
}

const cancelAudio = () => {
  cancelConfirmation.value = true
}

const ultimatelyCancel = () => {
  cancelConfirmation.value = false
  saveDialog.value = false
  audioName.value = ''
  audioDescription.value = ''
  audioRating.value = 0
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
.microphone-bubble {
  position: relative;
  margin: 1em;
  border-radius: 50%;
  box-shadow: 0 0 8px 0 hsla(0, 0%, 33%), 0 0 32px 0 hsla(243, 56%, 50%), 0 0 16px inset hsla(0, 0%, 100%, 100%);
  background-image: radial-gradient(circle at 50% 90%, hsl(243, 56%, 60%), hsl(243, 56%, 40%));
  width: 10em;
  height: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.microphone-bubble::after {
  position: absolute;
  top: 0;
  left: 15%;
  border-radius: 50%;
  background-image: radial-gradient(circle at 50% 100%, hsla(0, 0%, 100%, 0%), hsla(0, 0%, 100%, 75%));
  width: 70%;
  height: 50%;
  content: '';
}
.microphone-bubble > * {
  opacity: 75%;
}
.microphone-bubble:hover {
  box-shadow: 0 0 8px 0 hsla(0, 0%, 33%), 0 0 32px 0 hsla(243, 56%, 60%), 0 0 16px inset hsla(0, 0%, 100%, 100%);
  background-image: radial-gradient(circle at 50% 90%, hsl(243, 56%, 70%), hsl(243, 56%, 50%));
}
.microphone-bubble-active,
.microphone-bubble-active:hover,
.microphone-bubble:active {
  box-shadow: 0 0 8px 0 hsla(0, 0%, 33%), 0 0 32px 0 hsla(243, 56%, 40%), 0 0 16px inset hsla(0, 0%, 100%, 100%);
  background-image: radial-gradient(circle at 50% 90%, hsl(243, 56%, 50%), hsl(243, 56%, 30%));
}
</style>
