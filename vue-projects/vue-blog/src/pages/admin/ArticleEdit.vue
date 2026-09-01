<template>
  <div class="article-edit">
    <div class="edit-header">
      <RouterLink to="/admin/articles" class="btn btn-ghost">← 返回列表</RouterLink>
      <div class="edit-actions">
        <button class="btn btn-ghost" @click="save(false)">保存草稿</button>
        <button class="btn btn-primary" @click="save(true)">发布文章</button>
      </div>
    </div>

    <div class="edit-body">
      <!-- Left: Form -->
      <div class="edit-form">
        <div class="form-group">
          <label class="form-label">文章标题 *</label>
          <input v-model="form.title" type="text" class="form-input" placeholder="输入文章标题..." />
        </div>

        <div class="form-group">
          <label class="form-label">文章摘要</label>
          <textarea v-model="form.summary" class="form-input form-textarea" rows="3" placeholder="简短描述文章内容..."></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">选择标签</label>
          <div class="tags-select">
            <label
              v-for="tag in tags"
              :key="tag.id"
              class="tag-option"
            >
              <input type="checkbox" :value="tag.id" v-model="form.tags" style="display:none" />
              <span
                class="tag-badge"
                :style="form.tags.includes(tag.id)
                  ? { background: tag.color, opacity: 1 }
                  : { background: '#e2e8f0', color: '#64748b' }"
              >{{ tag.name }}</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Markdown 内容 *</label>
          <div class="editor-toolbar">
            <button class="toolbar-btn" @click="insertMd('**', '**')" title="加粗">B</button>
            <button class="toolbar-btn italic" @click="insertMd('*', '*')" title="斜体">I</button>
            <button class="toolbar-btn" @click="insertMd('`', '`')" title="行内代码">code</button>
            <button class="toolbar-btn" @click="insertBlock('```\n', '\n```')" title="代码块">```</button>
            <button class="toolbar-btn" @click="insertLinePrefix('# ')" title="标题1">H1</button>
            <button class="toolbar-btn" @click="insertLinePrefix('## ')" title="标题2">H2</button>
            <button class="toolbar-btn" @click="insertLinePrefix('> ')" title="引用">❝</button>
            <button class="toolbar-btn" @click="insertLinePrefix('- ')" title="列表">•</button>
            <div class="toolbar-sep"></div>
            <button :class="['toolbar-btn', previewMode ? 'active' : '']" @click="previewMode = !previewMode">
              {{ previewMode ? '编辑' : '预览' }}
            </button>
          </div>
          <div class="editor-container">
            <textarea
              v-if="!previewMode"
              ref="editorRef"
              v-model="form.content"
              class="form-input form-textarea editor-textarea"
              rows="20"
              placeholder="使用 Markdown 书写文章内容..."
            ></textarea>
            <div v-else class="editor-preview markdown-body" v-html="renderedPreview"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="toast" class="toast" :class="toast.type">{{ toast.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { useBlogStore } from '@/store/blog'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const store = useBlogStore()
const { tags } = storeToRefs(store)

const isEdit = computed(() => !!route.params.id)
const editorRef = ref<HTMLTextAreaElement | null>(null)
const previewMode = ref(false)

const form = ref({
  title: '',
  summary: '',
  content: '',
  tags: [] as string[],
})

const renderedPreview = computed(() => marked(form.value.content || '') as string)

onMounted(() => {
  if (isEdit.value) {
    const article = store.getArticleById(String(route.params.id))
    if (article) {
      form.value = {
        title: article.title,
        summary: article.summary,
        content: article.content,
        tags: [...article.tags],
      }
    }
  }
})

function insertMd(before: string, after: string) {
  const ta = editorRef.value
  if (!ta) return
  const start = ta.selectionStart
  const end = ta.selectionEnd
  const sel = form.value.content.slice(start, end)
  form.value.content = form.value.content.slice(0, start) + before + sel + after + form.value.content.slice(end)
}

function insertBlock(before: string, after: string) {
  const ta = editorRef.value
  if (!ta) return
  const start = ta.selectionStart
  const end = ta.selectionEnd
  const sel = form.value.content.slice(start, end)
  form.value.content = form.value.content.slice(0, start) + before + sel + after + form.value.content.slice(end)
}

function insertLinePrefix(prefix: string) {
  const ta = editorRef.value
  if (!ta) return
  const start = ta.selectionStart
  const lineStart = form.value.content.lastIndexOf('\n', start - 1) + 1
  form.value.content = form.value.content.slice(0, lineStart) + prefix + form.value.content.slice(lineStart)
}

interface Toast { message: string; type: 'success' | 'error' }
const toast = ref<Toast | null>(null)

function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast.value = { message, type }
  setTimeout(() => { toast.value = null }, 2500)
}

function save(publish: boolean) {
  if (!form.value.title.trim()) {
    showToast('请输入文章标题', 'error')
    return
  }
  if (!form.value.content.trim()) {
    showToast('请输入文章内容', 'error')
    return
  }

  if (isEdit.value) {
    store.updateArticle(String(route.params.id), {
      title: form.value.title,
      summary: form.value.summary,
      content: form.value.content,
      tags: form.value.tags,
      published: publish,
    })
    showToast(publish ? '文章已发布' : '草稿已保存')
  } else {
    store.addArticle({
      title: form.value.title,
      summary: form.value.summary,
      content: form.value.content,
      tags: form.value.tags,
      published: publish,
    })
    showToast(publish ? '文章已发布' : '草稿已保存')
    setTimeout(() => router.push('/admin/articles'), 1000)
  }
}
</script>

<style scoped>
.article-edit { display: flex; flex-direction: column; gap: 1.25rem; }

.edit-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.edit-actions { display: flex; gap: 0.5rem; }

.edit-body {}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group { display: flex; flex-direction: column; gap: 0.4rem; }

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
}

.form-input {
  padding: 0.6em 0.85em;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.9rem;
  background: var(--surface);
  color: var(--text);
  outline: none;
  transition: border-color 0.15s;
  font-family: inherit;
}

.form-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
}

.form-textarea { resize: vertical; min-height: 80px; }

.tags-select {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-option { cursor: pointer; }

.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.toolbar-btn {
  padding: 0.3em 0.7em;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.toolbar-btn:hover, .toolbar-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.toolbar-btn.italic { font-style: italic; }

.toolbar-sep {
  width: 1px;
  background: var(--border);
  margin: 0 0.25rem;
}

.editor-container {
  border: 1px solid var(--border);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}

.editor-textarea {
  width: 100%;
  border: none;
  border-radius: 0;
  font-family: 'Fira Code', 'JetBrains Mono', Consolas, monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  min-height: 420px;
  resize: vertical;
}

.editor-preview {
  padding: 1.5rem;
  min-height: 420px;
  background: var(--surface);
}

.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 9999;
  animation: slideIn 0.3s ease;
}

.toast.success { background: #22c55e; color: white; }
.toast.error { background: #ef4444; color: white; }

@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
