const safeParseJson = (json) => {
  try {
    return JSON.parse(json)
  } catch(e) {
    return json
  }
}

export default safeParseJson