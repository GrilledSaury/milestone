<script setup>
import { styles } from '../utils/style.js'
import { state } from '../state.js'
import ProgressBar from '../components/ProgressBar.vue'
import MenuBar from '../components/MenuBar.vue'
const { title } = defineProps(['title'])
const style = styles[state.style]
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div class="w-2/5 rounded-full flex items-center justify-center all-transition ring-4" :class="[style.bgColor_light, style.textColor_dark, style.ringColor, state.timer === 0 ? 'shadow-lg' : 'shadow-inner'].join(' ')" style="height: 40vw">
      TIMER
    </div>
  </div>
  <MenuBar title="Home" />
</template>