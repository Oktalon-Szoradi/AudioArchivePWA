<template>
  <div>
    <div class="title">Shelf</div>
    <div class="q-mt-xl text-center">
      <q-table
        class="audio-table"
        :rows="audioStore.audios"
        :columns="columns"
        row-key="id"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        :grid="$q.screen.lt.md"
      >
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card flat bordered>
              <q-card-section horizontal class="justify-between">
                <q-card-section>
                  <strong class="text-h6">{{ props.row.name }}</strong>
                </q-card-section>
                <q-card-section>
                  <span class="text-h6">
                    {{ `${`★`.repeat(props.row.rating)}${`☆`.repeat(5 - props.row.rating)}` }}
                  </span>
                </q-card-section>
              </q-card-section>
              <q-separator />
              <q-card-section horizontal class="q-pa-md justify-between">
                <div>{{ props.row.description }}</div>
                <div>
                  {{
                    `${new Date(props.row.timestamp).toLocaleDateString()} ${new Date(
                      props.row.timestamp
                    ).toLocaleTimeString()}`
                  }}
                </div>
              </q-card-section>
              <q-card-section>
                <q-btn color="primary" dense flat round icon="play_arrow" @click="playAudio(props.row)" />
                <q-btn color="primary" dense flat round icon="edit" @click="audioStore.editAudio(props.row)" />
                <q-btn color="primary" dense flat round icon="delete" @click="audioStore.deleteAudio(props.row.aid)" />
              </q-card-section>
            </q-card>
          </div>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn color="primary" dense flat round icon="play_arrow" @click="playAudio(props.row)" />
            <q-btn color="primary" dense flat round icon="edit" @click="audioStore.editAudio(props.row)" />
            <q-btn color="primary" dense flat round icon="delete" @click="audioStore.deleteAudio(props.row.aid)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="audioDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ selectedAudio.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <audio :src="audioURL" controls />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useAudioStore from '@/stores/audioStore.js'

const audioStore = useAudioStore()
audioStore.fetchAudios()

const pagination = ref({
  rowsPerPage: 0
})
const audioDialog = ref(false)
const selectedAudio = ref(null)
const audioURL = ref('')

const playAudio = async audio => {
  audioDialog.value = true
  selectedAudio.value = audio
  const { filename, aid } = audio
  const audioBlob = await audioStore.fetchAudioFile(filename, aid)
  audioURL.value = URL.createObjectURL(audioBlob)
}

const columns = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
    sortable: true
  },
  {
    name: 'rating',
    label: 'Rating',
    field: 'rating',
    format: val => `${`★`.repeat(val)}${`☆`.repeat(5 - val)}`,
    align: 'left',
    sortable: true
  },
  {
    name: 'timestamp',
    label: 'Time Created',
    field: 'timestamp',
    format: val => `${new Date(val).toLocaleDateString()} ${new Date(val).toLocaleTimeString()}`,
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
</script>

<style scoped>
* {
  color: #3d1a78;
}
.audio-table {
  width: 90vw;
}
</style>
