<script setup>
import { styles } from '../utils/style.js'
import { state } from '../state.js'
import { PaintBrushIcon, FireIcon } from '@heroicons/vue/24/solid'
import MenuBar from '../components/MenuBar.vue'
const isWide = window.innerWidth >= 768
const style = styles[state.style]
</script>

<template>
  <MenuBar title="Store" ghost="false"/>
  <div class="md:flex">
    <div class="md:w-1/3 w-screen flex md:flex-col items-center md:items-start overflow-y-scroll" :class="style.textColor_dark">
      <div class="all-transition flex items-center w-full justify-center md:justify-start hover:shadow px-4 py-2 cursor-pointer">
        <PaintBrushIcon class="w-6 m-1" />
        <div v-if="isWide" class="text-bold m-1">颜色</div>
      </div>
      <div class="all-transition flex items-center w-full justify-center md:justify-start hover:shadow px-4 py-2 cursor-pointer">
        <FireIcon class="w-6 m-1" />
        <div v-if="isWide" class="text-bold m-1">装饰</div>
      </div>
    </div>
    <div class="md:w-2/3 md:px-8 md:py-4 p-2 flex flex-wrap whitespace-nowrap">
      <div class="w-48 h-64 rounded border-2 p-2 m-2 cursor-pointer" :class="[style.bgColor_light, style.borderColor_dark].join(' ')">
        BLUE
      </div>
      <div class="w-48 h-64 rounded p-2 m-2 cursor-pointer hover:border-2 all-transition" :class="[style.bgColor_light, style.borderColor_light].join(' ')">
        DEFAULT
      </div>
    </div>
  </div>
</template>