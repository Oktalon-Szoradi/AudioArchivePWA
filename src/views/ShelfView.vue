<template>
  <div>
    <div class="title">Shelf</div>
    <div class="q-mt-xl text-center">
      <q-table
        class="audio-table"
        :rows="someStore.audios"
        :columns="columns"
        row-key="id"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              dense
              flat
              round
              icon="play_arrow"
              @click="someStore.playAudio(props.row)"
            />
            <q-btn
              color="primary"
              dense
              flat
              round
              icon="edit"
              @click="someStore.editAudio(props.row)"
            />
            <q-btn
              color="primary"
              dense
              flat
              round
              icon="delete"
              @click="someStore.deleteAudio(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import useSomeStore from '@/stores/someStore.js'
import { ref } from 'vue'

const someStore = useSomeStore()
someStore.fetchAudios()

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
