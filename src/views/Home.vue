<script setup>
import { styles } from '../utils/style.js'
import { state } from '../state.js'
import ProgressBar from '../components/ProgressBar.vue'
import MenuBar from '../components/MenuBar.vue'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
const { title } = defineProps(['title'])
const style = styles[state.style]
let setTime = $ref(30)

async function start () {
  state.timer = setTime * 60e3
}

async function stop () {
  state.timer = 0
}

const parseTime = () => moment(state.timer - 8 * 3600e3).format('HH:mm:ss') // UTC+8


</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div class="w-2/5 rounded-full flex items-center justify-center all-transition ring-8 cursor-pointer" :class="[style.bgColor_light, style.textColor_dark, style.ringColor, state.timer === 0 ? 'shadow-lg' : 'shadow-inner'].join(' ')" style="height: 40vw">
      <div v-if="state.timer === 0" class="flex flex-col items-center justify-center w-full h-full" @click="start">
        <ChevronUpIcon class="w-16 all-transition hover:w-20" @click.stop="setTime += 5" />
        <div class="font-bold font-mono text-8xl">{{ setTime }}</div>
        <div class="text-4xl bold">START</div>
        <ChevronDownIcon class="w-16 all-transition hover:w-20" @click.stop="setTime -= (setTime >= 5 ? 5 : setTime)" />
      </div>
      <div v-else class="flex flex-col items-center justify-center w-full h-full" @click="stop">
        <div class="text-8xl font-mono font-bold my-2">{{ parseTime() }}</div>
        <ProgressBar class="w-4/5 my-2" :ratio="(setTime * 60e3 - state.timer) / (setTime * 60e3)" />
      </div>
    </div>
  </div>
  <MenuBar title="Home" />
</template>