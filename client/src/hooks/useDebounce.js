import { useState } from "react"

const useDebounce = (func, delay) => {
  const [timeoutId, setTimeoutId] = useState(null)

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setTimeoutId(
      setTimeout(() => {
        func(...args)
      }, delay)
    )
  }
}

export default useDebounce
