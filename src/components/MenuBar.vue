<script setup>
import { styles } from '../utils/style.js'
import { state, LS } from '../state.js'
import { HomeIcon, ShoppingCartIcon, UserIcon } from '@heroicons/vue/24/solid'
import { GlobeAsiaAustraliaIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
const router = useRouter()
const { title, ghost } = defineProps(['title', 'ghost'])
const style = styles[state.style]
import { I } from '../utils/string.js'

function changeLocale () {
  state.locale = Number(!state.locale)
  LS.locale = state.locale
}

</script>

<template>
  <div class="px-4 py-2 shadow-lg flex items-center top-0 w-screen" :class="[style.bgColor_light, style.textColor_dark, ghost == 'true' ? 'absolute' : 'sticky'].join(' ')">
    <HomeIcon class="m-1 w-8 cursor-pointer" />
    <div class="text-2xl">{{ title }}</div>
    <div class="grow" />
    <ShoppingCartIcon class="m-1 w-8 cursor-pointer" @click="router.push('/store')"/>
    <UserIcon class="m-1 w-8 cursor-pointer" />
    <div class="flex items-center">
      <button class="flex items-center text-sm mr-4" :class="style.textColor_dark" @click="changeLocale">
        <GlobeAsiaAustraliaIcon class="w-4 mr-1" />
        {{ I('[[中文|English]]') }}
      </button>
      <User></User>
    </div>
  </div>
</template>