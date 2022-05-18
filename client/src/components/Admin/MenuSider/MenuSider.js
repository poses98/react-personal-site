import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MenuOutlined, HomeOutlined } from '@ant-design/icons';
import './MenuSider.scss';

export default function MenuSider(props) {
  console.log(props);
  const { menuCollapsed, setmenuCollapsed } = props;

  const { Sider } = Layout;
  return (
    <Sider
      className="admin-sider"
      collapsible
      collapsed={menuCollapsed}
      onCollapse={() => setmenuCollapsed(!menuCollapsed)}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to={'/admin'} onClick={() => setmenuCollapsed(true)}>
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/admin/menu-web" onClick={() => setmenuCollapsed(true)}>
            <MenuOutlined />
            <span className="nav-text">Menu Web</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
