<template>
  <div>
    About Page
    <div>Current Date:{{date}}</div>
  </div>
</template>

<script>
import moment from "moment/moment";

export default {
  name: "about-page",
  data() {
    return {
      date: null,
    }
  },
  mounted() {
    this.date=moment()
  }
}
</script>

<style scoped>

</style>
