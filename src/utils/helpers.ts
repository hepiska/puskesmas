export const parseQueryString = (link: any) => {
  const regex = /[&?]/
  const qs = link.split(regex)
  return qs.reduce((acc: any, val: string) => {
    const [key, _val] = val.split('=')
    if (key) {
      acc[key] = _val
    }
    return acc
  }, {})
}

export const objToQs = (obj: any) => Object.keys(obj).reduce((acc, key) => `${acc}${key}=${obj[key]}&`, '?')


export const hidetext = (text: string, number: number) : string =>  text.split("").map((car, idx) => text.length - number < idx ? "*": car).join("")