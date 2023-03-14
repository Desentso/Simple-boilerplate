export const localStorageGet = (key) => {
  try {
    return window.localStorage.getItem(key)
  } catch(e) {
    console.error(e)
  }
}

export const localStorageSet = (key, value) => {
  try {
    return window.localStorage.setItem(key, value)
  } catch(e) {
    console.error(e)
  }
}