import state from '../state.js'

export function T (template, data) {
  let res = template
  const regexp = /{{(((?!{{).)*?)}}/g
  while (regexp.test(res)) {
    const keys = res.match(regexp).map(x => x.substring(2, x.length - 2))
    for (const k of keys) res = res.replaceAll('{{' + k + '}}', data[k.trim()])
  }
  return res
}

export function I (template, choice = state.locale) {
  let res = template
  const regexp = /\[\[(((?!\[\[).)*?)\]\]/g
  while (regexp.test(res)) {
    const keys = res.match(regexp).map(x => x.substring(2, x.length - 2))
    for (const k of keys) res = res.replaceAll('[[' + k + ']]', k.split('|').length > choice ? k.split('|')[choice] : (k.split('|')[0] || ''))
  }
  return res
}

export function IT (template, data, choice = locale) {
  return I(T(template, data), choice)
}

export const random = () => Math.random().toString(36).substr(2, 10) + Math.random().toString(36).substr(2, 10)
