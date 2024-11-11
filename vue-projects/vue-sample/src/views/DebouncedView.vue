<script setup>
import {useDebouncedRef} from '@/utils/debouncedRef'

const text = useDebouncedRef('hello', 1000)
</script>

<template>
  <div>
    <p>
      This text only updates 1 second after you've stopped typing:
    </p>
    <p>{{ text }}</p>
    <input v-model="text"/>
  </div>
</template>