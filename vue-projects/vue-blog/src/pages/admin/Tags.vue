<template>
  <div class="tags-page">
    <div class="page-header">
      <h2></h2>
      <button class="btn btn-primary" @click="openCreate">+ 新建标签</button>
    </div>

    <div class="tags-grid">
      <div v-for="tag in tagsWithCount" :key="tag.id" class="tag-card card">
        <div class="tag-color-bar" :style="{ background: tag.color }"></div>
        <div class="tag-body">
          <div class="tag-info">
            <span class="tag-badge" :style="{ background: tag.color }">{{ tag.name }}</span>
            <span class="tag-count">{{ tag.count }} 篇文章</span>
          </div>
          <div class="tag-actions">
            <button class="btn btn-ghost btn-sm" @click="openEdit(tag)">编辑</button>
            <button class="btn btn-danger btn-sm" @click="confirmDelete(tag.id)">删除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal=false">
      <div class="modal card">
        <h3>{{ editingTag ? '编辑标签' : '新建标签' }}</h3>
        <div class="form-group">
          <label class="form-label">标签名称</label>
          <input v-model="modalForm.name" type="text" class="form-input" placeholder="标签名称" />
        </div>
        <div class="form-group">
          <label class="form-label">标签颜色</label>
          <div class="color-picker">
            <input v-model="modalForm.color" type="color" class="color-input" />
            <div class="color-presets">
              <button
                v-for="c in colorPresets"
                :key="c"
                class="color-preset"
                :style="{ background: c }"
                @click="modalForm.color = c"
              ></button>
            </div>
          </div>
          <span class="color-preview tag-badge" :style="{ background: modalForm.color }">{{ modalForm.name || '预览' }}</span>
        </div>
        <div class="modal-actions">
          <button class="btn btn-ghost" @click="showModal=false">取消</button>
          <button class="btn btn-primary" @click="saveTag">保存</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="deleteId" class="modal-overlay" @click.self="deleteId=null">
      <div class="modal card">
        <h3>确认删除</h3>
        <p>删除标签后，相关文章的该标签也会被移除。</p>
        <div class="modal-actions">
          <button class="btn btn-ghost" @click="deleteId=null">取消</button>
          <button class="btn btn-danger" @click="doDelete">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBlogStore } from '@/store/blog'
import { storeToRefs } from 'pinia'
import type { Tag } from '@/types'

const store = useBlogStore()
const { tags, articles } = storeToRefs(store)

const tagsWithCount = computed(() =>
  tags.value.map(tag => ({
    ...tag,
    count: articles.value.filter(a => a.tags.includes(tag.id)).length,
  }))
)

const showModal = ref(false)
const editingTag = ref<Tag | null>(null)
const deleteId = ref<string | null>(null)

const colorPresets = ['#3b82f6','#22c55e','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4','#64748b','#42b883','#3178c6']

const modalForm = ref({ name: '', color: '#3b82f6' })

function openCreate() {
  editingTag.value = null
  modalForm.value = { name: '', color: '#3b82f6' }
  showModal.value = true
}

function openEdit(tag: Tag & { count: number }) {
  editingTag.value = tag
  modalForm.value = { name: tag.name, color: tag.color }
  showModal.value = true
}

function saveTag() {
  if (!modalForm.value.name.trim()) return
  if (editingTag.value) {
    store.updateTag(editingTag.value.id, { name: modalForm.value.name, color: modalForm.value.color })
  } else {
    store.addTag({ name: modalForm.value.name, color: modalForm.value.color })
  }
  showModal.value = false
}

function confirmDelete(id: string) { deleteId.value = id }
function doDelete() {
  if (deleteId.value) {
    store.deleteTag(deleteId.value)
    deleteId.value = null
  }
}
</script>

<style scoped>
.tags-page { display: flex; flex-direction: column; gap: 1.25rem; }
.page-header { display: flex; align-items: center; justify-content: space-between; }

.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.tag-card { overflow: hidden; }
.tag-color-bar { height: 5px; }
.tag-body { padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }
.tag-info { display: flex; align-items: center; gap: 0.75rem; }
.tag-count { font-size: 0.8rem; color: var(--text-muted); }
.tag-actions { display: flex; gap: 0.5rem; }

.form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
.form-label { font-size: 0.875rem; font-weight: 600; }
.form-input {
  padding: 0.6em 0.85em;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.9rem;
  background: var(--surface);
  color: var(--text);
  outline: none;
}
.form-input:focus { border-color: var(--primary); }

.color-picker { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
.color-input { width: 40px; height: 36px; border: 1px solid var(--border); border-radius: 6px; cursor: pointer; padding: 2px; }
.color-presets { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.color-preset { width: 24px; height: 24px; border-radius: 6px; border: 2px solid white; cursor: pointer; box-shadow: 0 0 0 1px var(--border); transition: transform 0.1s; }
.color-preset:hover { transform: scale(1.2); }
.color-preview { margin-top: 0.25rem; }

.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.modal { padding: 2rem; max-width: 420px; width: 90%; }
.modal h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 1.25rem; }
.modal p { color: var(--text-secondary); margin-bottom: 1.5rem; }
.modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; }
.btn-sm { padding: 0.3em 0.75em; font-size: 0.8rem; }
</style>
