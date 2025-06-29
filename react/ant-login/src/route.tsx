import { DashboardOutlined, ProductOutlined, UserOutlined } from "@ant-design/icons";
import { DashboardPage } from "./pages/system/home/Dashboard.tsx";
import ProductPage from "./pages/product/ProductPage.tsx";
import UserPage from "./pages/system/user/UserPage.tsx";

const route = {
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

export default route;
