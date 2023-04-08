<script setup>
import { styles } from '../utils/style.js'
import { state } from '../state.js'
const { title } = defineProps(['title'])
const style = styles[state.style]
</script>

<template>
  <div class="px-4 py-2 shadow-lg flex items-center absolute top-0 w-screen" :class="[style.bgColor_light, style.textColor_dark].join(' ')">
    <div class="m-1">HomeIcon</div>
    <div class="text-2xl">{{ title }}</div>
    <div class="grow" />
    <div class="m-1">storeIcon</div>
    <div class="m-1">userIcon</div>
  </div>
</template>