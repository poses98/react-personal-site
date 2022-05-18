import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';

import './LayaoutAdmin.scss';

export default function LayoutAdmin(props) {
  const { children } = props;
  const [menuCollapsed, setmenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  console.log('menuCollapsed: ' + { menuCollapsed });
  return (
    <Layout>
      <MenuSider
        setmenuCollapsed={setmenuCollapsed}
        menuCollapsed={menuCollapsed}
      />
      <Layout
        className="layout-admin"
        style={{ marginLeft: menuCollapsed ? '80px' : '200px' }}
      >
        <Header className="layout-admin__header">
          <MenuTop />
        </Header>
        <Content className="layout-admin__content">{children}</Content>
        <Footer className="layout-admin__footer">Pablo Osés</Footer>
      </Layout>
    </Layout>
  );
}
