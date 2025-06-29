import { PageContainer, ProLayout } from "@ant-design/pro-components";
import ProductPage from "./pages/product/ProductPage.tsx";
import UserPage from "./pages/system/user/UserPage.tsx";
import { useState } from "react";
import { DashboardPage } from "./pages/system/home/Dashboard.tsx";
import { DashboardOutlined, ProductOutlined, UserOutlined } from "@ant-design/icons";
import { KeepAlive } from "react-activation";

const App = () => {
  const menuHeaderRender = () => <div>我是你大爷</div>;
  const menuFooterRender = () => <div>我是你祖宗</div>;

  // 定义菜单数据
  const menuData = {
    path: '/',
    routes: [
      {
        icon: <DashboardOutlined />,
        path: '/dashboard',
        name: '控制台',
        component: DashboardPage,
        key: 'dashboard'
      },
      {
        icon: <UserOutlined />,
        path: '/user',
        name: '用户管理',
        component: UserPage,
        key: 'user'
      },
      {
        icon: <ProductOutlined />,
        path: '/product',
        name: '产品管理',
        component: ProductPage,
        key: 'product'
      },
    ]
  };

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


  return (
      <ProLayout
          title="钣金MES"
          route={ menuData }
          location={ { pathname: `/${ activeKey }` } }
          menuItemRender={ (item, dom) => (
              <a onClick={ () => handleMenuClick(item) }>
                { dom }
              </a>
          ) }
          layout="mix"
          contentStyle={ { backgroundColor: "pink" } }
          menuHeaderRender={ menuHeaderRender }
          menuFooterRender={ menuFooterRender }
          breadcrumbRender={ () => [ { path: '/dashboard', breadcrumbName: '控制台' } ] }
          headerContentRender={ () => <div>headerContentRender</div> }
      >
        <PageContainer

            header={ {
              ghost: true
            } }
            tabList={ tabs.map(tab => ( {
              tab: tab.tab,
              key: tab.key
            } )) }
            tabProps={ {
              style: {
                backgroundColor: 'red', padding: 0, margin: 0, height: 40, marginLeft: -5,

              },
              type: "editable-card",
              tabBarStyle: {
                backgroundColor: '#f0f2f5', // 标签栏背景色
                borderBottom: '1px solid #e8e8e8', // 底部边框
              },
              tabBarGutter: 10,
            } }
            tabActiveKey={ activeKey }
            onTabChange={ setActiveKey }
            title={ false }
            childrenContentStyle={ { padding: 5, backgroundColor: "green" } }
        >
          { renderTabContent() }
        </PageContainer>
      </ProLayout>
  );
};

export default App;
