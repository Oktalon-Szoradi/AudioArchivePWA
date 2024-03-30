<template>
  <div>
    <div class="title">home</div>
    <div class="text-center">
      <img src="/AudioArchive_Logo.svg" />
      <h4 style="margin: 0 0 1em">Welcome!</h4>
      <p>
        To begin recording, just press the microphone bubble below.<br />
        Afterwards, you may give your recording a title, description, and a rating.
      </p>
      <p><b>Notice:</b> Currently, all saved audio is public!</p>
      <RecordingCompVue
        @recording-complete="promptSave"
        :offline="!audioStore.isOnline"
      />
      <q-btn
        class="q-mt-lg"
        glossy
        push
        label="Or upload your own audio file!"
        color="primary"
        @click="saveFileDialog = true"
      />
      <!-- <div class="flex flex-center">
        <q-uploader
          url="http://localhost:3000/upload"
          label="Or upload your own audio!"
          accept="audio/*"
          @rejected="onRejected"
        />
      </div> -->
    </div>
    <q-dialog v-model="saveDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Add Recording Details</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <AVWaveform
            :src="audioURL"
            :canv-width="300"
            noplayed-line-color="#7BADE2"
            played-line-color="#5049CB"
          />

          <q-form class="q-gutter-md">
            <q-input
              filled
              v-model="audioName"
              label="Audio Title"
              :rules="[
                val => (val && val.length > 0) || 'Please enter a title',
                val =>
                  (val && val.length <= 32) || 'Title should not exceed 32 characters'
              ]"
            />

            <q-input
              filled
              autogrow
              v-model="audioDescription"
              label="Audio Description"
            />

            <q-rating v-model="audioRating" size="2em" />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn glossy label="Save" color="primary" @click="saveAudio()" />
          <q-btn flat label="Cancel" color="primary" @click="cancelAudio()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="saveFileDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Upload Audio File</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <AVWaveform
            v-if="audioFile"
            :src="audioURL"
            :canv-width="300"
            noplayed-line-color="#7BADE2"
            played-line-color="#5049CB"
          />

          <q-form class="q-gutter-md">
            <q-file
              v-model="audioFile"
              label="Choose an audio file..."
              @update:model-value="makeAudioStuffFromFile()"
              filled
              accept="audio/*"
            />

            <q-input
              filled
              v-model="audioName"
              label="Audio Title"
              :rules="[
                val => (val && val.length > 0) || 'Please enter a title',
                val =>
                  (val && val.length <= 32) || 'Title should not exceed 32 characters'
              ]"
            />

            <q-input
              filled
              autogrow
              v-model="audioDescription"
              label="Audio Description"
            />

            <q-rating v-model="audioRating" size="2em" />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn glossy label="Save" color="primary" @click="saveAudio()" />
          <q-btn flat label="Cancel" color="primary" @click="cancelAudioFileUpload()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="cancelConfirmationDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Are you sure you want to cancel?</div>
        </q-card-section>

        <q-card-section class="q-pt-none" v-if="!audioFile"> Your recording will be lost. </q-card-section>

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
import { useQuasar } from 'quasar'
import useAudioStore from '@/stores/audioStore.js'
import RecordingCompVue from '@/components/RecordingComp.vue'
import { AVWaveform } from 'vue-audio-visual'

const $q = useQuasar()
const audioStore = useAudioStore()

const audioFile = ref(null)

const audioURL = ref('')
const audioTimeStamp = ref('')
const audioMimeType = ref('')
const audioBlob = ref('')

const audioName = ref('')
const audioDescription = ref('')
const audioRating = ref(0)

const saveDialog = ref(false)
const saveFileDialog = ref(false)
const cancelConfirmationDialog = ref(false)

const makeAudioStuffFromFile = () => {
  if (audioFile.value) {
    audioURL.value = URL.createObjectURL(audioFile.value)
    audioTimeStamp.value = new Date()
    audioMimeType.value = `${audioFile.value.type}; codecs=opus`
    audioBlob.value = audioFile.value
  }
}

const promptSave = ({ url, name, timeStamp, blob, mimeType }) => {
  audioURL.value = url
  audioName.value = name
  audioTimeStamp.value = timeStamp
  audioBlob.value = blob
  audioMimeType.value = mimeType
  saveDialog.value = true
}

const resetFields = () => {
  audioFile.value = null

  audioName.value = ''
  audioDescription.value = ''
  audioRating.value = 0

  audioURL.value = ''
  audioTimeStamp.value = ''
  audioMimeType.value = ''
  audioBlob.value = ''
}

const saveAudio = async () => {
  if (audioName.value.length > 32 || !audioName.value.length) {
    return
  }
  try {
    await audioStore.addAudio(
      audioName.value,
      audioDescription.value,
      audioRating.value,
      audioTimeStamp.value,
      audioBlob.value,
      audioMimeType.value
    )
    if (
      audioStore.audios.find(
        a =>
          new Date(a.timestamp).toString() === new Date(audioTimeStamp.value).toString()
      )
    ) {
      saveDialog.value = false
      saveFileDialog.value = false
      resetFields()
      $q.notify({
        icon: 'done',
        color: 'primary',
        classes: 'glossy',
        progress: true,
        position: 'top',
        message: 'Audio created successfully! Check it out in the Shelf.'
      })
    } else {
      $q.notify({
        icon: 'warning',
        color: 'orange',
        classes: 'glossy',
        progress: true,
        position: 'top',
        message: 'Audio may not have been created.'
      })
    }
  } catch (error) {
    console.error(error)
    $q.notify({
      icon: 'error',
      color: 'negative',
      classes: 'glossy',
      progress: true,
      position: 'top',
      message: 'Failed to add audio to the archive.'
    })
  }
}

const cancelAudio = () => {
  cancelConfirmationDialog.value = true
}

const cancelAudioFileUpload = () => {
  if (audioFile.value) {
    cancelConfirmationDialog.value = true
  } else {
    saveFileDialog.value = false
    resetFields()
  }
}

const ultimatelyCancel = () => {
  cancelConfirmationDialog.value = false
  saveDialog.value = false
  saveFileDialog.value = false
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
