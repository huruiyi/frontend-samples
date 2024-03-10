<template>
  <div class="container">
    <ul id="example-1">
      <li v-for="item in items" :key="item.message">
        {{ item.message }}
      </li>
    </ul>
    <Button name="你大爷(按钮一个)" type="primary" @click.native="greet">Greet</Button>
  </div>
</template>

<script>
export default {
  name: 'page2',
  data: function () {
    return {
      items: [
        {message: 'Page2----A'},
        {message: 'Page2----B'}
      ]
    }
  },
  methods: {
    greet: function (event) {
      if (event) {
        // 字符串
        //this.$router.push('/home/first')
        // // 对象
        // this.$router.push({ path: '/home/first' })
        // // 命名的路由
        // this.$router.push({ name: 'home', params: { userId: wise }})

        this.$router.push('/page1')
      }
    }
  }
}
</script>

<style scoped>
div.container{
  margin: 30px;
}
</style>
