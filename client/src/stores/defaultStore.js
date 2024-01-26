import { defineStore } from 'pinia'
import { ref } from 'vue'

const useDefaultStore = defineStore('DefaultId', () => {
  const aboutContent = ref('Implementiert von © Hosain Hossaini, HTL Wien West 2023')
  const counter = ref(0)

  const increaseCounter = () => {
    counter.value += 1
  }

  return { aboutContent, counter, increaseCounter }
})

export default useDefaultStore
