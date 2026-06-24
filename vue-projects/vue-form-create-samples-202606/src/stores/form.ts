import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Rule } from '@form-create/ant-design-vue'

const STORAGE_KEY = 'fc-demo:form-rule'
const DEFAULT_RULE: Rule[] = [
  {
    type: 'input',
    field: 'userName',
    title: '姓名',
    props: { placeholder: '请输入姓名' },
    validate: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  },
  {
    type: 'select',
    field: 'gender',
    title: '性别',
    props: { placeholder: '请选择' },
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
  },
  {
    type: 'textarea',
    field: 'remark',
    title: '备注',
    props: { placeholder: '请输入备注' },
  },
]

function loadFromStorage(): Rule[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_RULE
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : DEFAULT_RULE
  } catch {
    return DEFAULT_RULE
  }
}

export const useFormStore = defineStore('form', () => {
  // 设计器产出的表单规则
  const rule = ref<Rule[]>(loadFromStorage())
  // 已提交的表单数据历史
  const submissions = ref<Record<string, any>[]>([])

  const ruleJson = computed(() => JSON.stringify(rule.value, null, 2))
  const submissionCount = computed(() => submissions.value.length)

  function setRule(next: Rule[]) {
    rule.value = next
    persist()
  }

  function clearRule() {
    rule.value = []
    persist()
  }

  function loadFromJson(json: string) {
    const parsed = JSON.parse(json)
    if (!Array.isArray(parsed)) throw new Error('规则必须是数组')
    rule.value = parsed
    persist()
  }

  function addSubmission(data: Record<string, any>) {
    submissions.value.unshift({ ...data, __at: Date.now() })
  }

  function clearSubmissions() {
    submissions.value = []
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rule.value))
    } catch {
      /* 忽略写入失败 */
    }
  }

  return {
    rule,
    submissions,
    ruleJson,
    submissionCount,
    setRule,
    clearRule,
    loadFromJson,
    addSubmission,
    clearSubmissions,
  }
})
