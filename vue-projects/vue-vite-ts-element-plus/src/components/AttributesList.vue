<!-- AttributesTable.vue -->
<template>
  <div class="attributes-table">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="名称" width="180">
        <template #default="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="请输入名称"
            :disabled="disabled"
            @input="() => clearError(scope.$index, 'nameError')"
            :class="{ 'is-error': scope.row.nameError }"
          />
          <div class="error-message" v-if="scope.row.nameError">
            {{ scope.row.nameError }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="180">
        <template #default="scope">
          <el-select
            v-model="scope.row.type"
            placeholder="请选择类型"
            :disabled="disabled"
            clearable
            filterable
            style="width: 100%"
          >
            <template #prefix>
              <SvgIcon
                v-if="scope.row.type"
                :name="getValueType(scope.row.type).icon"
                style="margin-right: 8px; width: 16px; height: 16px"
                class-name="text-4xl"
              />
            </template>
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <div style="display: flex; align-items: center">
                <SvgIcon
                  :name="item.icon"
                  style="margin-right: 8px; width: 16px; height: 16px"
                  class-name="text-4xl"
                />
                <span>{{ item.label }}</span>
              </div>
            </el-option>
          </el-select>
          <div class="error-message" v-if="scope.row.typeError">
            {{ scope.row.typeError }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template #default="scope">
          <el-input v-model="scope.row.description" placeholder="请输入描述" :disabled="disabled" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90" fixed="right" v-if="!disabled">
        <template #default="scope">
          <el-button type="danger" text @click="removeRow(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="addRow" style="margin-top: 10px" v-if="!disabled">
      添加字段
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ValueTypeConfig, getValueType } from '@/enums/base.enum.ts'
// 定义类型选项（基于枚举配置）
const typeOptions = Object.values(ValueTypeConfig)
import SvgIcon from '@/components/SvgIcon.vue'

// 定义属性项接口
interface AttributeItem {
  name: string
  type: string
  description: string
  nameError?: string
  typeError?: string
}
// 定义组件实例接口
export interface AttributesTableInstance {
  validate: () => boolean
}
// 定义组件属性
interface Props {
  modelValue?: string
  disabled?: boolean
}

// 定义组件事件
interface Emits {
  (e: 'update:modelValue', value: string): void
}

// 接收属性和事件
const props = withDefaults(defineProps<Props>(), {
  disabled: false, // 默认不禁用
})
const emit = defineEmits<Emits>()

// 表格数据
const tableData = ref<AttributeItem[]>([])

// 解析传入的值
const parseValue = (value: string | undefined) => {
  if (!value) return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// 初始化表格数据
tableData.value = parseValue(props.modelValue)

// 监听传入值变化
watch(
  () => props.modelValue,
  (newValue) => {
    tableData.value = parseValue(newValue)
  },
)

// 监听表格数据变化并触发更新事件
watch(
  tableData,
  (newData) => {
    const jsonData = JSON.stringify(newData)
    emit('update:modelValue', jsonData)
  },
  { deep: true },
)

// 添加行
const addRow = () => {
  if (!props.disabled) {
    // 只有在非禁用状态下才能添加
    tableData.value.push({
      name: '',
      type: '',
      description: '',
    })
  }
}

// 删除行
const removeRow = (index: number) => {
  if (!props.disabled) {
    // 只有在非禁用状态下才能删除
    tableData.value.splice(index, 1)
  }
}
// 添加校验方法
const validate = (): boolean => {
  if (props.disabled) return true

  let isValid = true

  // 清除之前的错误信息
  tableData.value.forEach((item) => {
    delete item.nameError
    delete item.typeError
  })

  // 检查每个字段是否填写完整
  tableData.value.forEach((item, index) => {
    if (!item.name) {
      item.nameError = '名称不能为空'
      isValid = false
    } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(item.name)) {
      item.nameError = '名称只能包含字母、数字和下划线，且不能以数字开头'
      isValid = false
    }
    // 检查是否有重复名称
    const duplicateIndex = tableData.value.findIndex(
      (other, i) => i !== index && other.name === item.name,
    )
    if (duplicateIndex !== -1) {
      item.nameError = '名称不能重复'
      isValid = false
    }

    if (!item.type) {
      item.typeError = '类型不能为空'
      isValid = false
    }
  })
  return isValid
}

// 清除错误信息
const clearError = (index: number, errorField: 'nameError' | 'typeError') => {
  if (tableData.value[index]) {
    delete tableData.value[index][errorField]
  }
}

// 暴露方法给父组件
defineExpose({
  validate,
})

// 定义组件名称
defineOptions({
  name: 'AttributesTable',
})
</script>

<style scoped>
.attributes-table {
  width: 100%;
}
:deep(.el-select.is-error .el-select__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset;
}
.error-message {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1.2;
  padding-top: 4px;
  min-height: 16px;
}
:deep(.el-input.is-error .el-input__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset;
}
:deep(.el-table .el-cascader) {
  width: 100%;
}
</style>
