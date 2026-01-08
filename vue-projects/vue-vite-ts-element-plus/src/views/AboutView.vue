<template>
  <div>
    <div class="about">
      <SvgIcon name="integer" class-name="text-4xl" />
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <AttributesTable v-model="attributes" ref="attributesTableRef" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="12" :lg="6" :xl="4">
          <el-result icon="primary" title="Primary Tip" sub-title="Please follow the instructions">
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6" :xl="4">
          <el-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6" :xl="4">
          <el-result icon="warning" title="Warning Tip" sub-title="Please follow the instructions">
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6" :xl="4">
          <el-result icon="error" title="Error Tip" sub-title="Please follow the instructions">
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6" :xl="4">
          <el-result icon="info" title="Info Tip">
            <template #sub-title>
              <p>Using slot as subtitle</p>
            </template>
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import AttributesTable, { type AttributesTableInstance } from '@/components/AttributesList.vue'
import { ref } from 'vue'

import SvgIcon from '@/components/SvgIcon.vue'
const attributesTableRef = ref<AttributesTableInstance | null>(null)

const attributes = ref('')
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 10vh;
    display: flex;
    align-items: center;
  }
}
</style>
