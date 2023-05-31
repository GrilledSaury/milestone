<script setup>
import { styles } from '../utils/style.js'
import { state, LS } from '../state.js'
import { HomeIcon, ShoppingCartIcon, UserIcon, CurrencyDollarIcon } from '@heroicons/vue/24/solid'
import { GlobeAsiaAustraliaIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['title', 'ghost'])
const style = styles[state.style]
import { I } from '../utils/string.js'

let showUser = $ref(false)

function changeLocale () {
  state.locale = Number(!state.locale)
  LS.locale = state.locale
}

</script>

<template>
  <div class="px-4 py-2 shadow-lg flex items-center top-0 w-screen" :class="[style.bgColor_light, style.textColor_dark, props.ghost == 'true' ? 'absolute' : 'sticky'].join(' ')">
    <HomeIcon class="m-1 w-8 cursor-pointer" @click="router.push('/')"/>
    <div class="text-2xl">{{ I(props.title) }}</div>
    <div class="grow" />
    <ShoppingCartIcon class="m-1 w-8 cursor-pointer" @click="router.push('/store')"/>
    <UserIcon class="m-1 w-8 cursor-pointer" @click="showUser = !showUser"/>
    <div class="flex items-center m-1">
      <button class="flex items-center text-sm mr-4" :class="style.textColor_dark" @click="changeLocale">
        <GlobeAsiaAustraliaIcon class="w-4 mr-1" />
        {{ I('[[中文|English]]') }}
      </button>
      <User></User>
    </div>
    <div v-if="showUser" class="absolute -bottom-24 right-0 m-2 bg-white rounded shadow py-2 px-4 w-64 flex items-center">
      <div>
        <div class="text-2xl">{{ state.user.name }}</div>
        <div class="font-mono text-sm bold" :class="style.textColor_light">{{ state.user._id }}</div>
      </div>
      <div class="grow" />
      <div class="flex items-center">
        <CurrencyDollarIcon class="w-8 m-1" />
        <div class="font-mono font-bold m-1 text-xl">{{ state.user.coin }}</div>
      </div>
    </div>
  </div>
</template>