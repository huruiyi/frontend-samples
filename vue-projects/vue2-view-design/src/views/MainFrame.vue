<template>
  <div class="layout">
    <Layout :style="{minHeight: '99vh'}">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="80" v-model="isCollapsed">
        <Menu theme="light" active-name="" width="auto" :class="menuitemClasses">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"/>
              <span>知识点</span>
            </template>
            <MenuItem name="1-1" @click.native="handleUrl('/page0')">
              <Icon type="ios-navigate"></Icon>
              <span>集合-组件</span>
            </MenuItem>
            <MenuItem name="1-2" @click.native="handleUrl('/page1')">
              <Icon type="ios-navigate"></Icon>
              <span>Page1</span>
            </MenuItem>
            <MenuItem name="1-3" @click.native="handleUrl('/page2')">
              <Icon type="ios-navigate"></Icon>
              <span>Page2</span>
            </MenuItem>
            <MenuItem name="1-4" @click.native="handleUrl('/page3')">
              <Icon type="ios-navigate"></Icon>
              <span>列表分页</span>
            </MenuItem>
            <MenuItem name="1-5" @click.native="handleUrl('/page3_1')">
              <Icon type="ios-settings"></Icon>
              <span>父子3-1</span>
            </MenuItem>
            <MenuItem name="1-6" @click.native="handleUrl('/page3_2')">
              <Icon type="ios-settings"></Icon>
              <span>父子3-2</span>
            </MenuItem>
            <MenuItem name="1-7" @click.native="handleUrl('/page3_3')">
              <Icon type="ios-settings"></Icon>
              <span>父子3-3</span>
            </MenuItem>
            <MenuItem name="1-8" @click.native="handleUrl('/page4')">
              <Icon type="ios-settings"></Icon>
              <span>自定义插件</span>
            </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu"
                size="24"></Icon>
        </Header>
        <Content :style="{margin: '10px', background: '#fff', minHeight: '260px'}">
          <div>
            <div style="position: relative">
              <router-view/>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'MainFrame',
  data() {
    return {
      isCollapsed: false
    }
  },
  computed: {
    rotateIcon() {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse()
    },
    handleUrl(url) {
      console.log(url)
      if (this.currentUrl !== url) {
        this.currentUrl = url
        this.$router.push({path: url})
      }
    }
  }
}
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all .3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}


.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 80px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width .2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
