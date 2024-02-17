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
                    {{
                      `${`★`.repeat(props.row.rating)}${`☆`.repeat(5 - props.row.rating)}`
                    }}
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
                <q-btn
                  color="primary"
                  dense
                  flat
                  round
                  icon="play_arrow"
                  @click="audioStore.playAudio(props.row)"
                />
                <q-btn
                  color="primary"
                  dense
                  flat
                  round
                  icon="edit"
                  @click="audioStore.editAudio(props.row)"
                />
                <q-btn
                  color="primary"
                  dense
                  flat
                  round
                  icon="delete"
                  @click="audioStore.deleteAudio(props.row)"
                />
              </q-card-section>
            </q-card>
          </div>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              dense
              flat
              round
              icon="play_arrow"
              @click="audioStore.playAudio(props.row)"
            />
            <q-btn
              color="primary"
              dense
              flat
              round
              icon="edit"
              @click="audioStore.editAudio(props.row)"
            />
            <q-btn
              color="primary"
              dense
              flat
              round
              icon="delete"
              @click="audioStore.deleteAudio(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
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
    format: (val) => `${`★`.repeat(val)}${`☆`.repeat(5 - val)}`,
    align: 'left',
    sortable: true
  },
  {
    name: 'timestamp',
    label: 'Time Created',
    field: 'timestamp',
    format: (val) =>
      `${new Date(val).toLocaleDateString()} ${new Date(val).toLocaleTimeString()}`,
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
