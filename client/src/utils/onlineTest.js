// Copilot:
// export const onlineTest = async () => {
//   const url = 'https://jsonplaceholder.typicode.com/todos/1'
//   try {
//     const response = await fetch(url)
//     const json = await response.json()
//     if (json.id === 1) {
//       return true
//     } else {
//       return false
//     }
//   } catch (error) {
//     return false
//   }
// }

export const onlineTest = async () => {
  try {
    await fetch(window.location.origin, { method: 'HEAD' })
    return true
  } catch (error) {
    return false
  }
}
