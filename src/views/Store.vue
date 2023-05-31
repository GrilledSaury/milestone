<script setup>
import { styles } from '../utils/style.js'
import { state } from '../state.js'
import { I } from '../utils/string.js'
import { PaintBrushIcon, FireIcon, LockClosedIcon } from '@heroicons/vue/24/solid'
import MenuBar from '../components/MenuBar.vue'
const isWide = window.innerWidth >= 768
const style = styles[state.style]
let item = $ref(0), s = $ref(state.style)

async function choose (i) {
  if (i === 'RED') {
    await Swal.fire({
      title: I('[[LOCKED|已锁定]]'),
      icon: 'info',
      text: I('[[Pay 9999 coins to unlock|花费9999金币解锁]]'),
      showCancelButton: true
    }).then(async res => {
      if (res.isConfirmed) {
        await Swal.fire(I('[[Failed|失败]]'), I('[[You do not have enough coins|您没有足够的金币]]'), 'error')
      }
    })
    return
  }
  let cancel = false
  if (i === 'BLUE' && state.blueLock) {
    await Swal.fire({
      title: I('[[LOCKED|已锁定]]'),
      icon: 'info',
      text: I('[[Pay 50 coins to unlock|花费50金币解锁]]'),
      showCancelButton: true
    }).then(async res => {
      if (res.isConfirmed) {
        state.user.coin -= 50
        state.blueLock = false
        await Swal.fire(I('[[Done|成功]]'), I('[[Now you owned the style [BLUE]|您现在已拥有[蓝色]主题]]'), 'success')
      }
      else cancel = true
    })
  }
  if (cancel) return
  state.style = i
  s = i
  await Swal.fire(I('[[Note|注意]]'), I('[[Settings would be applied as you had left the page.|离开此页后自动保存主题设置。]]'), 'info')
}
</script>

<template>
  <MenuBar title="[[Store|商店]]" ghost="false"/>
  <div class="md:flex">
    <div class="md:w-1/3 w-screen flex md:flex-col items-center md:items-start overflow-y-scroll p-4">
      <div class="all-transition flex items-center w-full justify-center md:justify-start px-4 py-2 my-2 cursor-pointer rounded" :class="item === 0 ? ['text-white', style.bgColor_dark].join(' ') : [style.textColor_dark, style.bgColor_light].join(' ')" @click="item = 0">
        <PaintBrushIcon class="w-6 m-1" />
        <div v-if="isWide" class="text-bold m-1">{{ I('[[Color|颜色]]') }}</div>
      </div>
      <div class="all-transition flex items-center w-full justify-center md:justify-start px-4 py-2 my-2 cursor-pointer rounded" :class="item === 1 ? ['text-white', style.bgColor_dark].join(' ') : [style.textColor_dark, style.bgColor_light].join(' ')" @click="item = 1">
        <FireIcon class="w-6 m-1" />
        <div v-if="isWide" class="text-bold m-1">{{ I('[[Others|其他]]') }}</div>
      </div>
    </div>
    <div v-if="item === 0" class="md:w-2/3 md:px-8 md:py-4 p-2 flex flex-wrap whitespace-nowrap">
      <div class="w-48 h-64 rounded p-4 m-2 cursor-pointer all-transition font-bold text-2xl relative" :class="[style.textColor_dark, style.bgColor_light].join(' ')" @click="choose('RED')">
        {{ I('[[RED|红色]]') }}
        <LockClosedIcon class="w-8 absolute bottom-4 right-4"/>
      </div>
      <div class="w-48 h-64 rounded p-4 m-2 cursor-pointer all-transition font-bold text-2xl relative" :class="s === 'BLUE' ? ['text-white', style.bgColor_dark].join(' ') : [style.textColor_dark, style.bgColor_light].join(' ')" @click="choose('BLUE')">
        {{ I('[[BLUE|蓝色]]') }}
        <LockClosedIcon v-if="state.blueLock" class="w-8 absolute bottom-4 right-4"/>
      </div>
      <div class="w-48 h-64 rounded p-4 m-2 cursor-pointer all-transition font-bold text-2xl" :class="s === 'DEFAULT' ? ['text-white', style.bgColor_dark].join(' ') : [style.textColor_dark, style.bgColor_light].join(' ')" @click="choose('DEFAULT')">
        {{ I('[[DEFAULT|默认]]') }}
      </div>
    </div>
  </div>
</template>