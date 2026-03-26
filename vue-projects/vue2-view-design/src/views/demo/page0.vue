<template>
  <div v-if="!isEditMode" class="page0-grid-wrap">
    <div class="page0-title">
      <Icon type="ios-cube-outline" />
      <span>集合循环和自定义组件</span>
    </div>

    <Row :gutter="16">
      <Col :xs="24" :md="12" :xl="8" class="grid-col">
        <Card class="feature-card">
          <p slot="title">列表集合</p>
          <Lists></Lists>
        </Card>
      </Col>

      <Col :xs="24" :md="12" :xl="8" class="grid-col">
        <Card class="feature-card">
          <p slot="title">组件示例</p>
          <HelloWorld p-msg="haha" msg="Welcome to Your Vue.js App" />
        </Card>
      </Col>

      <Col :xs="24" :md="24" :xl="8" class="grid-col">
        <Card class="feature-card">
          <p slot="title">消息区</p>
          <say-hello :who="who"></say-hello>
          <h2 class="message-title">{{ page0P1 }}</h2>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Lists from '@/components/Lists.vue'
import SayHello from "@/components/SayHello.vue";

export default {
  name : 'page0',
  props : {
    page0P1 : String
  },
  components : {
    Lists,
    HelloWorld,
    SayHello
  },
  data : function () {
    return {
      who : 'vue:say-hello',
      isEditMode : false
    }
  }
}
</script>

<style scoped>
.page0-grid-wrap {
  padding: 4px;
}

.page0-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  color: #1f2937;
  font-size: 16px;
  font-weight: 600;
}

.grid-col {
  margin-bottom: 16px;
}

.feature-card {
  height: 100%;
  border-radius: 10px;
}

.message-title {
  margin-top: 12px;
  color: #2563eb;
}

</style>
