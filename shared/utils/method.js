export const getFirstLetterOfWord = (string = '') => {
  const subString = string.split(' ')
  const firstWord = subString[0] ? subString[0] : ''
  const lastWord = subString[1] ? subString[1] : ''

  return `${firstWord.charAt(0)}${lastWord.charAt(0)}`
}
