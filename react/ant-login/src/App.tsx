import { PageContainer, ProLayout } from "@ant-design/pro-components";
import ProductPage from "./pages/product/ProductPage.tsx";
import UserPage from "./pages/system/user/UserPage.tsx";
import { type ComponentType, useState } from "react";
import { DashboardPage } from "./pages/system/home/Dashboard.tsx";
import { DashboardOutlined, ProductOutlined, UserOutlined } from "@ant-design/icons";


const App = () => {

  const menuHeaderRender = () => {
    return (
        <div>我是你大爷</div>
    );
  }

  const menuFooterRender = () => {
    return (
        <div>我是你祖宗</div>
    );
  }

  const menuData = {
    path: '/',
    routes: [
      {
        icon: <DashboardOutlined />,
        path: '/dashboard',
        name: '控制台',
        component: DashboardPage,
      },
      {
        icon: <UserOutlined />,
        path: '/user',
        name: '用户管理',
        component: UserPage,
      },
      {
        icon: <ProductOutlined />,
        path: '/product',
        name: '产品管理',
        component: ProductPage,
      },
    ]
  };
  const [ pathname, setPathname ] = useState('/dashboard');

  // 根据当前路径获取要渲染的组件
  const getCurrentComponent = (): ComponentType | null => {
    const route = menuData.routes.find(r => r.path === pathname);
    return route ? route.component as ComponentType : null;
  };

  const CurrentComponent = getCurrentComponent();


  return (
      <ProLayout
          title={ "钣金MES" }
          route={ menuData }
          location={ {
            pathname,
          } }
          onMenuHeaderClick={ (e) => console.log(e) }
          menuItemRender={ (item, dom) => (
              <a style={ { backgroundColor: "azure" } }
                 onClick={ () => {
                   setPathname(item.path || '/welcome');
                 } }
              >
                { dom }
              </a>
          ) }
          contentStyle={
            { backgroundColor: "azure" }
          }
          layout={ "mix" }
          menuHeaderRender={ menuHeaderRender }
          menuFooterRender={ menuFooterRender }
      >
        <PageContainer>
          { CurrentComponent && <CurrentComponent /> }
        </PageContainer>
      </ProLayout>
  );
};

export default App;
