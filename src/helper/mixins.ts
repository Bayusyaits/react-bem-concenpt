export const currencyFormat = (val: number | string) => {
    let idr: number | string = 0
    const number = Number(val)
    if (number) {
      const numberString = number.toString().replace(/[^,\d]/g, '')
      const numberSplit = numberString.split(',')
      const numberMod = numberSplit[0].length % 3
      idr = numberSplit[0].substr(0, numberMod)
      const numberMatch = numberSplit[0].substr(numberMod).match(/\d{3}/gi)
  
      if (numberMatch) {
          const separator = numberMod ? '.' : ''
          idr += separator + numberMatch.join('.')
      }
  
      idr = numberSplit[1] !== undefined ? `${idr},${numberSplit[1]}` : idr
    }
    return `Rp${idr}`
  }

  export const handlePhoneNumber = (e: any) => {
    const key = e.key
    const rgxChar = /^[0-9*\+-]+$/
    if (!rgxChar.test(key) && ![37, 39, 8, 86, 67, 9, 17, 91].includes(e.keyCode)) {
      e.preventDefault()
    }
  }

  export function randomString(length: number, chars: string) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
