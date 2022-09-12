import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, HomeOutlined, MenuOutlined } from '@ant-design/icons';
import './MenuSider.scss';

export default function MenuSider(props) {
  const { menuCollapsed, setmenuCollapsed } = props;
  const { Sider } = Layout;
  const { pathname } = useLocation();
  return (
    <Sider
      className="admin-sider"
      collapsible
      collapsed={menuCollapsed}
      onCollapse={() => setmenuCollapsed(!menuCollapsed)}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={pathname}>
        <Menu.Item key="/admin">
          <Link to={'/admin'} onClick={() => setmenuCollapsed(true)}>
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/users">
          <Link to="/admin/users" onClick={() => setmenuCollapsed(true)}>
            <UserOutlined />
            <span className="nav-text">Usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/menu">
          <Link to="/admin/menu" onClick={() => setmenuCollapsed(true)}>
            <MenuOutlined />
            <span className="nav-text">Menú Web</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
