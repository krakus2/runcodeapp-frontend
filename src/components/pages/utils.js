export const deleteSpaces = text => {
  let newText = Array.from(text)
  if (typeof text === 'string') {
    Array.from(text).forEach((elem, i) => {
      if (elem === ' ' && text[i + 1] === ' ') {
        newText[i] = ''
      } else {
        newText[i] = elem
      }
    })
  }
  return newText.join('')
}
