import { defineStore } from 'pinia'
import { ref } from 'vue'

/*
  Based on:
  https://gist.github.com/itechmeat/11e4e91b77b649ad3b63b63d8293ceb4
*/

const useStopWatchStore = defineStore('StopWatchStore', () => {
  const hours = ref(false)
  const minutes = ref(true)

  const time = ref(null)
  const isRunning = ref(false)
  const startTime = ref(null)
  const times = ref([0, 0, 0, 0])
  const frameId = ref(null)

  const reset = () => {
    startTime.value = 0
    isRunning.value = false
    times.value = [0, 0, 0, 0]
    time.value = formatTimes()
  }

  const start = () => {
    if (isRunning.value) throw new Error('Stopwatch has already started.')
    isRunning.value = true
    if (!startTime.value) startTime.value = performance.now()
    frameId.value = window.requestAnimationFrame(step)
  }

  const stop = () => {
    if (!isRunning.value) throw new Error('Stopwatch has not been started yet.')
    isRunning.value = false
    startTime.value = null
    times.value = [0, 0, 0, 0]
    window.cancelAnimationFrame(frameId.value)
    reset()
  }

  const formatTimes = () => {
    const hoursStr = pad0(times.value[0], 2)
    const minutesStr = pad0(times.value[1], 2)
    const secondsStr = pad0(times.value[2], 2)
    const millisecondsStr = pad0(Math.trunc(times.value[3] % 1000), 3)
    if (hours.value) {
      return `${hoursStr}:${minutesStr}:${secondsStr}.${millisecondsStr}`
    }
    if (minutes.value) {
      return `${minutesStr}:${secondsStr}.${millisecondsStr}`
    }
    return `${secondsStr}.${millisecondsStr}`
  }

  const pad0 = (value, count) =>
    `${'0'.repeat(count - value.toString().length)}${value}`

  const step = timestamp => {
    if (!isRunning.value) return
    calculate(timestamp)
    startTime.value = timestamp
    time.value = formatTimes()
    frameId.value = window.requestAnimationFrame(step)
  }

  const calculate = timestamp => {
    const diff = timestamp - startTime.value
    times.value[3] += diff
    if (times.value[3] >= 1000) {
      times.value[3] -= 1000
      times.value[2] += 1
    }
    if (times.value[2] >= 60) {
      times.value[2] -= 60
      times.value[1] += 1
    }
    if (times.value[1] >= 60) {
      times.value[1] -= 60
      times.value[0] += 1
    }
  }

  return {
    time,
    start,
    stop
  }
})

export default useStopWatchStore
