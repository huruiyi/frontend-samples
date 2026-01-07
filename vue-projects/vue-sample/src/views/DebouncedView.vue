<script setup>
import { useDebouncedRef } from '@/utils/debouncedRef'
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
import MyComponentV1 from "@/components/MyComponentV1.vue";
import MyComponentV2 from "@/components/MyComponentV2.vue";
import MyComponentV3 from "@/components/MyComponentV3.vue";

const text = useDebouncedRef('hello', 1000)
</script>

<template>
  <div>
    <p>
      This text only updates 1 second after you've stopped typing:
    </p>
    <p>{{ text }}</p>
    <input v-model="text" />
    <a-input v-model:value="text" />

    <a-input v-model:value="text" placeholder="Basic usage">
      <template #prefix>
        <user-outlined />
      </template>
      <template #suffix>
        <a-tooltip title="Extra information">
          <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </template>
    </a-input>

    <my-component-v1/>
    <my-component-v2/>
    <my-component-v3/>
  </div>
</template>
