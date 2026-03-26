<template>
  <div class="layout">
    <Layout class="root-frame">
      <Sider ref="side1" class="app-sider" hide-trigger collapsible :collapsed-width="80" v-model="isCollapsed">
        <div class="sider-inner">
          <div class="brand" :class="{ collapsed: isCollapsed }">
            <Icon type="ios-apps" />
            <span>View Design</span>
          </div>
          <Menu theme="light" :active-name="currentMenu" width="auto" :class="['side-menu', menuitemClasses]">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-paper" />
                <span :title="isCollapsed ? '知识点' : ''">知识点</span>
              </template>
              <MenuItem name="1-1" :title="isCollapsed ? '集合-组件' : ''" @click.native="handleUrl('/page0')">
                <Icon type="ios-navigate"></Icon>
                <span>集合-组件</span>
              </MenuItem>
              <MenuItem name="1-2" :title="isCollapsed ? 'Page1' : ''" @click.native="handleUrl('/page1')">
                <Icon type="ios-navigate"></Icon>
                <span>Page1</span>
              </MenuItem>
              <MenuItem name="1-3" :title="isCollapsed ? 'Page2' : ''" @click.native="handleUrl('/page2')">
                <Icon type="ios-navigate"></Icon>
                <span>Page2</span>
              </MenuItem>
              <MenuItem name="1-4" :title="isCollapsed ? '列表分页' : ''" @click.native="handleUrl('/page3')">
                <Icon type="ios-navigate"></Icon>
                <span>列表分页</span>
              </MenuItem>
              <MenuItem name="1-5" :title="isCollapsed ? '父子3-1' : ''" @click.native="handleUrl('/page3_1')">
                <Icon type="ios-settings"></Icon>
                <span>父子3-1</span>
              </MenuItem>
              <MenuItem name="1-6" :title="isCollapsed ? '父子3-2' : ''" @click.native="handleUrl('/page3_2')">
                <Icon type="ios-settings"></Icon>
                <span>父子3-2</span>
              </MenuItem>
              <MenuItem name="1-7" :title="isCollapsed ? '父子3-3' : ''" @click.native="handleUrl('/page3_3')">
                <Icon type="ios-settings"></Icon>
                <span>父子3-3</span>
              </MenuItem>
              <MenuItem name="1-8" :title="isCollapsed ? '父子通信' : ''" @click.native="handleUrl('/page3_family')">
                <Icon type="ios-git-merge"></Icon>
                <span>父子通信</span>
              </MenuItem>
              <MenuItem name="1-9" :title="isCollapsed ? '自定义插件' : ''" @click.native="handleUrl('/page4')">
                <Icon type="ios-settings"></Icon>
                <span>自定义插件</span>
              </MenuItem>
              <MenuItem name="1-10" :title="isCollapsed ? 'Shopping' : ''" @click.native="handleUrl('/shopping')">
                <Icon type="ios-cart"></Icon>
                <span>Shopping</span>
              </MenuItem>
            </Submenu>
          </Menu>
        </div>
      </Sider>
      <Layout class="page-layout">
        <Header class="layout-header-bar">
          <div class="header-left">
            <Icon @click.native="collapsedSider" :class="rotateIcon" class="menu-trigger" type="md-menu" size="22" />
            <span class="header-title">Vue2 View Design Playground</span>
          </div>
          <Tag color="blue">{{ currentPathLabel }}</Tag>
        </Header>
        <Content class="layout-content">
          <div class="content-shell">
            <router-view />
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name : 'MainFrame',
  data() {
    return {
      isCollapsed : false,
      currentUrl : this.$route.path
    }
  },
  created() {
    this.syncByRoute(this.$route.path)
  },
  watch : {
    '$route.path'(val) {
      this.syncByRoute(val)
    }
  },
  computed : {
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
    },
    currentMenu() {
      return this.menuNameMap[this.currentUrl] || ''
    },
    currentPathLabel() {
      return this.pathLabelMap[this.currentUrl] || 'Welcome'
    },
    menuNameMap() {
      return {
        '/page0' : '1-1',
        '/page1' : '1-2',
        '/page2' : '1-3',
        '/page3' : '1-4',
        '/page3_1' : '1-5',
        '/page3_2' : '1-6',
        '/page3_3' : '1-7',
        '/page3_family' : '1-8',
        '/page4' : '1-9',
        '/shopping' : '1-10'
      }
    },
    pathLabelMap() {
      return {
        '/page0' : '集合-组件',
        '/page1' : 'Page1',
        '/page2' : 'Page2',
        '/page3' : '列表分页',
        '/page3_1' : '父子3-1',
        '/page3_2' : '父子3-2',
        '/page3_3' : '父子3-3',
        '/page3_family' : '父子通信(合并)',
        '/page4' : '自定义插件',
        '/shopping' : 'Shopping'
      }
    }
  },
  methods : {
    collapsedSider() {
      this.$refs.side1.toggleCollapse()
    },
    syncByRoute(path) {
      this.currentUrl = path
    },
    handleUrl(url) {
      if (this.currentUrl !== url) {
        this.currentUrl = url
        this.$router.push({ path : url })
      }
    }
  }
}
</script>

<style scoped>
.layout {
  position: relative;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
}

.root-frame {
  height: 100%;
}

.app-sider {
  height: 100%;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(31, 41, 55, 0.08);
}

.sider-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.brand {
  height: 56px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  margin: 8px 8px 4px;
  border-radius: 10px;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
  font-size: 15px;
}

.brand.collapsed span {
  display: none;
}

.brand.collapsed {
  justify-content: center;
  padding: 0;
}

.side-menu {
  flex: 1;
  overflow-y: auto;
}

.page-layout {
  padding-left: 14px;
  min-width: 0;
}

.layout-header-bar {
  height: 56px;
  line-height: 56px;
  padding: 0 16px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.07);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-title {
  font-size: 15px;
  color: #1f2937;
  font-weight: 600;
}

.menu-trigger {
  color: #475569;
  cursor: pointer;
}

.layout-content {
  margin-top: 12px;
  flex: 1;
  min-height: 0;
}

.content-shell {
  height: 100%;
  min-height: 0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  padding: 18px;
  position: relative;
  overflow: auto;
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
  width: 0;
  transition: width .2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}

/* Make collapsed menu cleaner: centered icons and compact rows. */
.collapsed-menu /deep/ .ivu-menu-submenu-title,
.collapsed-menu /deep/ .ivu-menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 !important;
}

.collapsed-menu /deep/ .ivu-menu-submenu-title .ivu-menu-submenu-title-icon,
.collapsed-menu /deep/ .ivu-menu-submenu-title .ivu-icon-ios-arrow-down {
  display: none;
}

.collapsed-menu /deep/ .ivu-menu-submenu-title i,
.collapsed-menu /deep/ .ivu-menu-item i {
  margin-right: 0;
  transform: none;
  font-size: 18px;
}

.collapsed-menu /deep/ .ivu-menu-item-active,
.collapsed-menu /deep/ .ivu-menu-item:hover,
.collapsed-menu /deep/ .ivu-menu-submenu-title:hover {
  background: #eef6ff;
}

@media (max-width: 900px) {
  .layout {
    padding: 8px;
  }

  .page-layout {
    padding-left: 8px;
  }

  .header-title {
    display: none;
  }

  .content-shell {
    padding: 12px;
  }
}
</style>
