<template>
  <div class="title-editor">
    <p class="editor-tip">Change the title of your shopping list</p>
    <Input :value="value" @on-change="onInput" placeholder="Input a title" />
  </div>
</template>

<script>
export default {
  props : [ 'value' ],
  methods : {
    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
.title-editor {
  padding: 2px 0;
}

.editor-tip {
  margin: 0 0 8px;
  color: #6b7280;
  font-size: 13px;
}
</style>
