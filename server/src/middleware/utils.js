const gibibytesToBytes = gib => {
  return gib * 1024 ** 3
}

const mebibytesToBytes = mib => {
  return mib * 1024 ** 2
}

const kibiBytesToBytes = kib => {
  return kib * 1024
}

export { gibibytesToBytes, mebibytesToBytes, kibiBytesToBytes }
