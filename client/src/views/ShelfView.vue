<template>
  <div>
    <div class="title">shelf</div>
    <div class="q-mt-xl text-center">
      <q-banner v-if="!audioStore.isOnline" rounded class="q-mb-sm offline-banner">
        <b class="text-white" style="text-shadow: 0 2px 2px black"
          >You are offline!&nbsp;&nbsp;&colon;&lpar;</b
        >
      </q-banner>
      <q-table
        class="audio-table"
        :rows="audioStore.audios"
        :columns="updatedColumns"
        row-key="id"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        :grid="$q.screen.lt.sm"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              dense
              flat
              round
              icon="play_arrow"
              @click="playAudio(props.row)"
            />
            <q-btn
              color="primary"
              dense
              flat
              round
              icon="edit"
              @click="editAudio(props.row)"
            />
            <q-btn
              color="primary"
              dense
              flat
              round
              icon="delete"
              @click="promptDelete(props.row)"
            />
          </q-td>
        </template>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card flat bordered>
              <q-card-section horizontal class="justify-between">
                <q-card-section class="text-left overflow-ellipse">
                  <strong class="text-h6">{{ props.row.name }}</strong>
                </q-card-section>
                <q-card-section>
                  <span class="text-h6">
                    {{
                      `${`★`.repeat(props.row.rating)}${`☆`.repeat(5 - props.row.rating)}`
                    }}
                  </span>
                </q-card-section>
              </q-card-section>
              <q-separator />
              <q-card-section horizontal class="q-pa-md justify-between">
                <div class="text-left">
                  <i v-if="props.row.description.trim() === ''" style="opacity: 0.5">
                    No description
                  </i>
                  {{ props.row.description }}
                </div>
                <div class="text-right" style="min-width: 150px">
                  {{ formatISO9075(props.row.timestamp) }}
                </div>
              </q-card-section>
              <q-card-section>
                <q-btn
                  color="primary"
                  dense
                  flat
                  round
                  icon="play_arrow"
                  @click="playAudio(props.row)"
                />
                <q-btn
                  color="primary"
                  dense
                  flat
                  round
                  icon="edit"
                  @click="editAudio(props.row)"
                />
                <q-btn
                  color="primary"
                  dense
                  flat
                  round
                  icon="delete"
                  @click="promptDelete(props.row)"
                />
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="audioDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ selectedAudio.name }}</div>
        </q-card-section>

        <q-card-section>
          <i v-if="selectedAudio.description.trim() === ''" style="opacity: 0.5">
            No description
          </i>
          <p v-else>
            {{ selectedAudio.description }}
          </p>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <AVWaveform
            :canv-width="300"
            :src="audioURL"
            noplayed-line-color="#7BADE2"
            played-line-color="#5049CB"
          />
        </q-card-section>

        <q-card-actions align="right">
          <a
            ref="downloadLink"
            :href="audioUrlTranscoded"
            :download="selectedAudio.filename"
            style="display: none"
          ></a>

          <span class="q-ma-sm">{{ ffmpegStatus }}</span>

          <q-btn
            glossy
            label="Download"
            color="primary"
            @click="downloadCurrentAudio()"
          />
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Are you sure you want to delete {{ selectedAudio.name }}?
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none"> It cannot be brought back! </q-card-section>

        <q-card-actions align="right">
          <q-btn
            glossy
            label="Yes"
            color="primary"
            @click="audioStore.deleteAudio(selectedAudio.aid)"
            v-close-popup
          />
          <q-btn flat label="No" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editDialog">
      <q-card :style="!$q.screen.lt.sm ? 'width: 67vw' : ''">
        <q-card-section>
          <div class="text-h6">Edit {{ selectedAudio.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <q-form class="q-gutter-md">
            <q-input
              filled
              v-model="newAudioName"
              label="New Audio Title"
              :rules="[
                val => (val && val.length > 0) || 'Please enter a title',
                val =>
                  (val && val.length <= 32) || 'Title should not exceed 32 characters'
              ]"
            />

            <q-input
              filled
              autogrow
              v-model="newAudioDescription"
              label="New Audio Description"
            />

            <q-rating v-model="newAudioRating" size="2em" />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            glossy
            label="Update"
            color="primary"
            @click="updateAudio(selectedAudio)"
          />
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useQuasar } from 'quasar'
import useAudioStore from '@/stores/audioStore.js'
import { AVWaveform } from 'vue-audio-visual'
import { formatISO9075 } from 'date-fns'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

const $q = useQuasar()

const ffmpeg = new FFmpeg()
const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'

const audioStore = useAudioStore()
audioStore.fetchAudios()

const pagination = ref({
  rowsPerPage: 0
})

const audioDialog = ref(false)
const deleteDialog = ref(false)
const editDialog = ref(false)

const newAudioName = ref('')
const newAudioDescription = ref('')
const newAudioRating = ref(0)

const selectedAudio = ref(null)
const audioURL = ref('')
const audioUrlTranscoded = ref('')
const downloadLink = ref(null)

const ffmpegStatus = ref('')

const playAudio = async audio => {
  selectedAudio.value = audio
  const { filename, aid } = audio
  const audioBlob = await audioStore.fetchAudioFile(filename, aid)
  audioURL.value = URL.createObjectURL(audioBlob)
  audioDialog.value = true
}

const downloadCurrentAudio = () => {
  nextTick(async () => {
    // https://github.com/ffmpegwasm/ffmpeg.wasm/blob/main/apps/vue-vite-app/src/components/FFmpegDemo.vue
   /*  message.value = 'Loading ffmpeg-core.js'
    ffmpeg.on('log', ({ message: msg }) => {
      message.value = msg
    })
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
    })
    message.value = 'Start transcoding'
    await ffmpeg.writeFile(selectedAudio.filename, await fetchFile(audioURL.value))
    await ffmpeg.exec(['-i', selectedAudio.filename, `${selectedAudio.name}.mp3`])
    message.value = 'Complete transcoding'
    const data = await ffmpeg.readFile(`${selectedAudio.name}.mp3`)
    audioUrlTranscoded.value = URL.createObjectURL(
      new Blob([data.buffer], { type: 'audio' })
    ) */

    downloadLink.value.click()
  })
}

const promptDelete = audio => {
  selectedAudio.value = audio
  deleteDialog.value = true
}

const editAudio = audio => {
  selectedAudio.value = audio
  newAudioName.value = audio.name
  newAudioDescription.value = audio.description
  newAudioRating.value = audio.rating
  editDialog.value = true
}

const updateAudio = () => {
  if (newAudioName.value.length > 32 || !newAudioName.value.length) {
    return
  }
  selectedAudio.value.name = newAudioName.value
  selectedAudio.value.description = newAudioDescription.value
  selectedAudio.value.rating = newAudioRating.value
  audioStore.updateAudio(selectedAudio.value)
  editDialog.value = false
}

const columns = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
    sortable: true,
    style:
      'max-width: 128px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'
    // classes: 'q-table--col-auto-width'
  },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
    sortable: true,
    style:
      'max-width: 192px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'
    // classes: 'q-table--col-auto-width'
  },
  {
    name: 'rating',
    label: 'Rating',
    field: 'rating',
    format: val => `${`★`.repeat(val)}${`☆`.repeat(5 - val)}`,
    align: 'left',
    sortable: true,
    style: 'font-size: 1.5em;'
  },
  {
    name: 'timestamp',
    label: 'Time Created',
    field: 'timestamp',
    // format: val => `${new Date(val).toLocaleDateString()} ${new Date(val).toLocaleTimeString()}`,
    format: val => formatISO9075(val),
    align: 'left',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Actions',
    align: 'center',
    sortable: false
  }
]

const updatedColumns = computed(() => {
  if ($q.screen.lt.md) {
    return columns.filter(column => column.name !== 'description')
  }
  return columns
})
</script>

<style scoped>
* {
  color: #3d1a78;
}

.audio-table {
  backdrop-filter: blur(4px);
  width: 90vw;
}

.offline-banner {
  backdrop-filter: blur(4px);
  background: linear-gradient(
      to bottom,
      rgb(255 255 255 / 30%),
      rgb(255 255 255 / 0%) 50%,
      rgb(0 0 0 / 12%) 51%,
      rgb(0 0 0 / 4%)
    ),
    linear-gradient(
      to bottom,
      hsla(0deg 100% 60% / 67%),
      hsla(0deg 100% 40% / 67%),
      hsla(0deg 100% 50% / 67%)
    );
}

/* stylelint-disable selector-class-pattern */
.audio-table:not(.q-table--grid) {
  background-color: hsla(211deg 64% 95% / 50%);
}

.q-table--grid {
  backdrop-filter: none;
}
/* stylelint-enable selector-class-pattern */
</style>
