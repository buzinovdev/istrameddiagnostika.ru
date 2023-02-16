import {defineNuxtPlugin} from "nuxt/app";

export default defineNuxtPlugin(nuxtApp => {
  const cutString = (str: string, n: number) => {
    let result = ''
    if (str.length > n) {
      result = str.substr(0, n - 1)
      result = result.slice(0, result.lastIndexOf(' ')) + '...'
    } else {
      result = str
    }
    return result
  }
  return {
    provide: {
      cutString: (cutString)
    }
  }
});