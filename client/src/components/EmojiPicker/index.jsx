import Picker from '@emoji-mart/react'
import { useEffect, useState } from 'react'

const EmojiPicker = ({onChange, value, onClickOutside}) => {

  const [data, setData] = useState(null)

  useEffect(async () => {
    const response = await fetch(
      'https://cdn.jsdelivr.net/npm/@emoji-mart/data',
    )

    setData(response.json())
  }, [])

  return (
    <Picker
      data={data}
      onEmojiSelect={onChange}
      onClickOutside={onClickOutside}
    />
  )
}

export default EmojiPicker