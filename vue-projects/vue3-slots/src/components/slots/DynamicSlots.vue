<script setup>
defineProps({
  sections: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="dynamic-slots">
    <article class="dynamic-slots__item" v-for="section in sections" :key="section.key">
      <h4>{{ section.title }}</h4>
      <slot :name="`section-${section.key}`" :section="section">
        <p>未提供 <code>section-{{ section.key }}</code> 插槽，显示默认内容。</p>
      </slot>
    </article>
  </div>
</template>

<style scoped>
.dynamic-slots {
  display: grid;
  gap: 10px;
}

.dynamic-slots__item {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px 12px;
}

h4 {
  margin: 0 0 6px;
}

p {
  margin: 0;
}
</style>
