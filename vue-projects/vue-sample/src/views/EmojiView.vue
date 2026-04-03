<script setup>
import { ref } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const selectedEmoji = ref(null)

function onSelectEmoji(emoji) {
  selectedEmoji.value = emoji
}
</script>

<template>
  <section class="emoji-page">
    <header class="emoji-page__hero">
      <div>
        <p class="emoji-page__eyebrow">Emoji Demo</p>
        <h1>双主题表情选择器</h1>
        <p>这里保留浅色和深色两种选择器，用选中结果面板实时展示当前 emoji 的详细信息。</p>
      </div>

      <div class="emoji-page__preview">
        <span class="emoji-page__preview-icon">{{ selectedEmoji?.i || '🙂' }}</span>
        <div>
          <strong>{{ selectedEmoji?.n?.[0] || '请选择一个表情' }}</strong>
          <p>{{ selectedEmoji?.u || '选中后会在这里显示 unicode 信息' }}</p>
        </div>
      </div>
    </header>

    <div class="emoji-page__grid">
      <article class="emoji-page__panel">
        <div class="emoji-page__panel-head">
          <h2>Light Picker</h2>
          <span>默认主题</span>
        </div>
        <EmojiPicker :native="true" @select="onSelectEmoji" />
      </article>

      <article class="emoji-page__panel emoji-page__panel--dark">
        <div class="emoji-page__panel-head">
          <h2>Dark Picker</h2>
          <span>夜间主题</span>
        </div>
        <EmojiPicker theme="dark" :native="true" @select="onSelectEmoji" />
      </article>
    </div>

    <article class="emoji-page__details">
      <h2>选中结果</h2>
      <div class="emoji-page__detail-grid">
        <div>
          <span>字符</span>
          <p>{{ selectedEmoji?.i || '未选择' }}</p>
        </div>
        <div>
          <span>名称</span>
          <p>{{ selectedEmoji?.n?.join(', ') || '未选择' }}</p>
        </div>
        <div>
          <span>带肤色编码</span>
          <p>{{ selectedEmoji?.r || '未选择' }}</p>
        </div>
        <div>
          <span>基础编码</span>
          <p>{{ selectedEmoji?.u || '未选择' }}</p>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.emoji-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.emoji-page__hero,
.emoji-page__panel,
.emoji-page__details {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.66);
  box-shadow: 0 18px 40px rgba(84, 60, 33, 0.08);
}

.emoji-page__hero {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.emoji-page__eyebrow {
  margin-bottom: 10px;
  color: var(--color-accent);
  font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.emoji-page__hero p {
  color: var(--color-text-soft);
}

.emoji-page__preview {
  display: flex;
  gap: 14px;
  align-items: center;
  min-width: 260px;
  padding: 18px;
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(255, 247, 236, 0.92), rgba(236, 245, 242, 0.88));
}

.emoji-page__preview-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.86);
  font-size: 2rem;
}

.emoji-page__preview strong {
  display: block;
  margin-bottom: 4px;
  color: var(--color-heading);
}

.emoji-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}

.emoji-page__panel--dark {
  background: linear-gradient(180deg, rgba(35, 38, 43, 0.96), rgba(55, 60, 68, 0.96));
}

.emoji-page__panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.emoji-page__panel-head span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(212, 106, 61, 0.12);
  color: var(--color-accent);
  font-size: 0.8rem;
}

.emoji-page__panel--dark .emoji-page__panel-head h2 {
  color: #fff9f0;
}

.emoji-page__panel--dark .emoji-page__panel-head span {
  background: rgba(255, 255, 255, 0.12);
  color: #f9d9b8;
}

.emoji-page__details h2 {
  margin-bottom: 16px;
}

.emoji-page__detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
}

.emoji-page__detail-grid div {
  padding: 16px;
  border-radius: 18px;
  background: rgba(247, 240, 231, 0.72);
}

.emoji-page__detail-grid span {
  display: block;
  margin-bottom: 6px;
  color: var(--color-text-soft);
  font-size: 0.82rem;
}

@media (max-width: 768px) {
  .emoji-page__hero {
    flex-direction: column;
  }

  .emoji-page__preview {
    min-width: 0;
  }
}
</style>
