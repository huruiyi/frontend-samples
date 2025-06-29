import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { useState } from "react";
import { DashboardPage } from "./pages/system/home/Dashboard.tsx";
import { KeepAlive } from "react-activation";
import { Tabs } from "antd";
import route from "./route.tsx";

const App = () => {
  const menuHeaderRender = () => <div>我是你大爷</div>;
  const menuFooterRender = () => <div>我是你祖宗</div>;

  const [ activeKey, setActiveKey ] = useState('dashboard');
  const [ tabs, setTabs ] = useState([
    { key: 'dashboard', tab: '控制台', component: DashboardPage }
  ]);

  // 处理菜单点击
  const handleMenuClick = (item: any) => {
    const key = item.key;
    setActiveKey(key);

    // 如果标签页不存在则添加
    if (!tabs.some(tab => tab.key === key)) {
      setTabs(prev => [
        ...prev,
        {
          key,
          tab: item.name,
          component: item.component
        }
      ]);
    }
  };

  // 渲染标签页内容
  const renderTabContent = () => {
    const currentTab = tabs.find(tab => tab.key === activeKey);
    if (!currentTab) return null;

    return (
        <KeepAlive name={ currentTab.key } saveScrollPosition="screen">
          <currentTab.component />
        </KeepAlive>
    );
  };

  // 自定义页面头部渲染函数
  const tabRender = () => {
    return (
        <Tabs
            activeKey={ activeKey }
            onChange={ setActiveKey }
            type="editable-card"
            tabBarStyle={ {
              height: 50,
              lineHeight:50,
              backgroundColor: '#f0f2f5',
              borderBottom: '1px solid #e8e8e8',
              paddingBottom: 0
            } }
            tabBarGutter={ 10 }
            onEdit={ (targetKey, action) => {
              // 处理标签页关闭逻辑
              if (action === 'remove') {
                setTabs(prev => prev.filter(tab => tab.key !== targetKey));
                // 如果关闭了当前激活的标签，切换到第一个标签
                if (targetKey === activeKey && tabs.length > 1) {
                  setActiveKey(tabs[0].key);
                }
              }
            } }
        >
          { tabs.map(tab => (
              <Tabs.TabPane   tab={ tab.tab } key={ tab.key } closable={ tab.key !== 'dashboard' } />
          )) }
        </Tabs>
    );
  };

  return (
      <ProLayout
          title="钣金MES"
          route={ route }
          location={ { pathname: `/${ activeKey }` } }
          menuItemRender={ (item, dom) => (
              <a onClick={ () => handleMenuClick(item) }>
                { dom }
              </a>
          ) }
          layout="mix"
          menuHeaderRender={ menuHeaderRender }
          menuFooterRender={ menuFooterRender }
          headerContentRender={ () => <div>headerContentRender</div> }
      >
        <PageContainer
            pageHeaderRender={ tabRender }
            childrenContentStyle={ {
              padding: 10, margin: 0
            } }>
          { renderTabContent() }
        </PageContainer>
      </ProLayout>
  );
};

export default App;
