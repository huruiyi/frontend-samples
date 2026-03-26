<template>
  <div>
    <Button type="primary" @click.native="childMethod">点击</Button>
  </div>
</template>

<script>
export default {
  name : 'child31',
  methods : {
    findAncestorMethod(methodName) {
      let node = this.$parent
      while (node) {
        if (typeof node[methodName] === 'function') {
          return node[methodName].bind(node)
        }
        node = node.$parent
      }
      return null
    },
    // childMethod() {
    //   this.$parent.fatherMethod()
    // },
    childMethod() {
      const handler = this.findAncestorMethod('fatherMethod')
      if (handler) {
        handler()
        return
      }
      // Keep demo stable even when no matching parent method exists.
      console.warn('[child31] fatherMethod not found in $parent chain')
    },
    childMethod2() {
      let parent = this.$parent
      while (parent && typeof parent.fatherMethod !== 'function') {
        parent = parent.$parent
      }

      if (parent && typeof parent.fatherMethod === 'function') {
        parent.fatherMethod()
      } else {
        // Keep the demo stable even if component nesting changes.
        console.warn('fatherMethod was not found in parent chain')
      }
    }
  }
}
</script>

<style scoped>

</style>
