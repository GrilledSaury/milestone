import { reactive, watch } from 'vue'

export const SS = window.sessionStorage

export const LS = window.localStorage

export const state = reactive({
  locale: Number(LS.locale || 0),
  loading: false,
  user: SS.user ? JSON.parse(SS.user) : null,
  style: 'DEFAULT',
  timer: 0,
  settle: false,
  blueLock: true
})

let last = 0

function go () {
  if (state.timer === 0) return
  if (state.timer < 0) {
    state.timer = 0
    state.settle = true
    return
  }
  const now = Date.now()
  if (now - last > 1000) {
    last = now
    return
  }
  state.timer -= now - last
  last = now
}

setInterval(go, 100)

export default state
