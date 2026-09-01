<template>
  <div class="settings-page">
    <div class="settings-form card">
      <h2 class="section-title">基本信息</h2>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">博客标题</label>
          <input v-model="form.title" type="text" class="form-input" placeholder="我的个人博客" />
        </div>
        <div class="form-group">
          <label class="form-label">副标题</label>
          <input v-model="form.subtitle" type="text" class="form-input" placeholder="记录技术成长，分享开发心得" />
        </div>
        <div class="form-group">
          <label class="form-label">作者姓名</label>
          <input v-model="form.authorName" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label class="form-label">GitHub 链接</label>
          <input v-model="form.githubUrl" type="url" class="form-input" placeholder="https://github.com/yourname" />
        </div>
        <div class="form-group">
          <label class="form-label">联系邮箱</label>
          <input v-model="form.email" type="email" class="form-input" placeholder="your@email.com" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">作者简介</label>
        <textarea v-model="form.authorBio" class="form-input form-textarea" rows="3" placeholder="简短介绍自己..."></textarea>
      </div>

      <h2 class="section-title" style="margin-top:1.5rem">关于页面内容</h2>
      <div class="form-group">
        <label class="form-label">支持 Markdown 格式</label>
        <textarea v-model="form.aboutContent" class="form-input form-textarea" rows="12" placeholder="关于我的详细介绍..."></textarea>
      </div>

      <div class="form-actions">
        <button class="btn btn-primary" @click="handleSave">保存设置</button>
      </div>
    </div>

    <div v-if="toast" class="toast success">{{ toast }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBlogStore } from '@/store/blog'

const store = useBlogStore()

const form = ref({ ...store.siteConfig })
const toast = ref('')

onMounted(() => {
  form.value = { ...store.siteConfig }
})

function handleSave() {
  store.updateSiteConfig({ ...form.value })
  toast.value = '设置已保存'
  setTimeout(() => { toast.value = '' }, 2500)
}
</script>

<style scoped>
.settings-page {}
.settings-form { padding: 1.75rem 2rem; }
.section-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text); border-bottom: 1px solid var(--border); padding-bottom: 0.6rem; }

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-label { font-size: 0.875rem; font-weight: 600; color: var(--text); }
.form-input {
  padding: 0.6em 0.85em;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.9rem;
  background: var(--surface);
  color: var(--text);
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
}
.form-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(59,130,246,0.12); }
.form-textarea { resize: vertical; }

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
}

.toast {
  position: fixed; bottom: 2rem; right: 2rem;
  background: #22c55e; color: white;
  padding: 0.75rem 1.5rem; border-radius: 10px;
  font-size: 0.9rem; font-weight: 500; z-index: 9999;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
