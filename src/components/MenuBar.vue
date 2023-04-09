<script setup>
import { styles } from '../utils/style.js'
import { state } from '../state.js'
import { HomeIcon, ShoppingCartIcon, UserIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'
const router = useRouter()
const { title } = defineProps(['title'])
const style = styles[state.style]
</script>

<template>
  <div class="px-4 py-2 shadow-lg flex items-center absolute top-0 w-screen" :class="[style.bgColor_light, style.textColor_dark].join(' ')">
    <HomeIcon class="m-1 w-8 cursor-pointer" />
    <div class="text-2xl">{{ title }}</div>
    <div class="grow" />
    <ShoppingCartIcon class="m-1 w-8 cursor-pointer" @click="router.push('/store')"/>
    <UserIcon class="m-1 w-8 cursor-pointer" />
  </div>
</template>