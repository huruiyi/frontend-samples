<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const x = ref(0)
const y = ref(0)

const handleMove = (event) => {
  x.value = event.clientX
  y.value = event.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', handleMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMove)
})
</script>

<template>
  <slot :x="x" :y="y" />
</template>
