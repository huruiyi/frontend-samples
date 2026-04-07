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

<style scoped src="../assets/views/EmojiView.css"></style>
