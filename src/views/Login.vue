<script setup>
import { state } from '../state.js'
import { UserIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center bg-gray-100">
    <div class="md:w-1/3 w-4/5 bg-white shadow rounded flex flex-col items-center px-8 py-16">
      <UserIcon class="w-16 text-blue-400 m-2" />
      <input class="rounded shadow-inner p-1 m-2 font-mono" placeholder="username">
      <input class="rounded shadow-inner p-1 m-2 font-mono" placeholder="password">
      <button class="rounded px-4 py-2 bg-blue-400 text-white text-bold shadow m-2">Login</button>
    </div>
  </div>
</template>