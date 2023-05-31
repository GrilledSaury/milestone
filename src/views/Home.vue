<script setup>
import { watch } from 'vue'
import { styles } from '../utils/style.js'
import { state, SS } from '../state.js'
import { I } from '../utils/string.js'
import ProgressBar from '../components/ProgressBar.vue'
import MenuBar from '../components/MenuBar.vue'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'
const router = useRouter()
const { title } = defineProps(['title'])
const style = styles[state.style]
const isWide = window.innerWidth > 1024
let setTime = $ref(state.settle || 5)

if (!SS.user) router.push('/login')

watch(() => state.settle, async (v, old) => {
  if (!v || !old) return
  await Swal.fire(I('[[Success|成功]]'), I(`[[You got ${old} coins!|你收获了${old}金币！]]`), 'success')
  state.user.coin += old
  state.settle = false
  setTime = 5
})

async function start () {
  state.settle = setTime
  state.timer = setTime * 60e3
  document.addEventListener('visibilitychange', reset)
}

async function reset () {
  await Swal.fire(I('[[Warning|提示]]'), I('[[Your timer is going to be reset due to inactivity.|由于您离开了页面，您的进度已重置]]'), 'warning')
  state.settle = false
  state.timer = 0
  document.removeEventListener('visibilitychange', reset)
}

async function stop () {
  state.timer = 0
  state.settle = false
  document.removeEventListener('visibilitychange', reset)
}

const parseTime = () => moment(state.timer - 8 * 3600e3).format('HH:mm:ss') // UTC+8


</script>

<template>
  <MenuBar title="[[Home|主页]]" ghost="true"/>
  <div class="h-screen w-screen flex items-center justify-center">
    <div class="rounded-full flex items-center justify-center all-transition ring-8 cursor-pointer" :class="[style.bgColor_light, style.textColor_dark, style.ringColor, state.timer === 0 ? 'shadow-lg' : 'shadow-inner'].join(' ')" :style="isWide ? { width: '40vw', height: '40vw' } : { width: '80vw', height: '80vw' }">
      <div v-if="state.timer === 0" class="flex flex-col items-center justify-center w-full h-full" @click="start">
        <ChevronUpIcon class="w-16 all-transition hover:w-20" @click.stop="setTime += 1" />
        <div class="font-bold font-mono md:text-8xl text-4xl">{{ setTime }}</div>
        <div class="md:text-4xl text-2xl bold">{{ I('[[START|开始]]') }}</div>
        <ChevronDownIcon class="w-16 all-transition hover:w-20" @click.stop="setTime -= (setTime >= 1 ? 1 : setTime)" />
      </div>
      <div v-else class="flex flex-col items-center justify-center w-full h-full" @click="stop">
        <div class="lg:text-8xl text-4xl font-mono font-bold my-2">{{ parseTime() }}</div>
        <ProgressBar class="w-4/5 my-2" :ratio="(setTime * 60e3 - state.timer) / (setTime * 60e3)" />
      </div>
    </div>
  </div>
  {{ state }}
</template>