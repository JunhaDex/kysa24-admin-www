export function cleanRequestObj(obj: any) {
  return Object.keys(obj).reduce((acc: any, key: string) => {
    if (obj[key] !== undefined) {
      acc[key] = obj[key]
    }
    return acc
  }, {})
}
