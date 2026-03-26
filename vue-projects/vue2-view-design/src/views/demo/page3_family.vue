<template>
  <div class="family-demo">
    <!--    <child31></child31>-->
    <Card>
      <p slot="title">
        <Icon type="ios-people-outline" />
        父子通信合集
      </p>

      <Row :gutter="16">
        <Col :xs="24" :md="8" class="demo-col">
          <Card dis-hover>
            <p slot="title">方式一：$parent 调用</p>
            <child31></child31>
          </Card>
        </Col>
        <Col :xs="24" :md="8" class="demo-col">
          <Card dis-hover>
            <p slot="title">方式二：$emit 事件</p>
            <child32 @fatherMethodx="fatherMethodFromEmit"></child32>
          </Card>
        </Col>
        <Col :xs="24" :md="8" class="demo-col">
          <Card dis-hover>
            <p slot="title">方式三：函数 props</p>
            <child33 :fatherMethod="fatherMethodFromProps"></child33>
          </Card>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import child31 from '../../components/child31'
import child32 from '../../components/child32'
import child33 from '../../components/child33'

export default {
  name : 'page3_family',
  components : {
    child31,
    child32,
    child33
  },
  methods : {
    fatherMethod() {
      this.$Message.info('方式一触发：$parent 调用父组件方法')
    },
    fatherMethodFromEmit() {
      this.$Message.success('方式二触发：子组件 emit 通知父组件')
    },
    fatherMethodFromProps() {
      this.$Message.warning('方式三触发：父组件函数通过 props 传入')
    }
  }
}
</script>

<style scoped>
.demo-col {
  margin-bottom: 12px;
}
</style>

