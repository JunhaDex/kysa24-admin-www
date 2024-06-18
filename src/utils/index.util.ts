import dayjs from 'dayjs'

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

export function formatDate(unix: number, coverage?: 'date' | 'datetime') {
  if (coverage === 'datetime') {
    return dayjs(unix).tz().format('YYYY-MM-DD HH:mm:ss')
  }
  return dayjs(unix).tz().format('YYYY-MM-DD')
}
