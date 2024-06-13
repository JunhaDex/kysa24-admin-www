export function cleanRequestObj(obj: any) {
  if (!obj) return obj
  return Object.keys(obj).reduce((acc: any, key: string) => {
    const keyKebab = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    if (obj[key] !== undefined) {
      acc[keyKebab] = obj[key].toString()
    }
    return acc
  }, {})
}
