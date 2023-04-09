<script setup>
import { styles } from '../utils/style.js'
import { state } from '../state.js'
const style = styles[state.style]
const { ratio } = defineProps(['ratio'])
const bar = $computed(() => ((ratio || 0) * 100).toFixed(1) + '%')
</script>

<template>
  <div class="flex rounded-full overflow-hidden bg-white" :class="style.textColor_dark">
    <div class="rounded-full all-transition" :class="style.bgColor_dark" :style="{ width: bar }" />
    <div class="font-bold relative all-transition" :class="ratio > 0.4 ? ['right-16 px-0 w-0', style.textColor_light].join(' ') : 'px-2'">{{ bar }}</div>
  </div>
</template>
