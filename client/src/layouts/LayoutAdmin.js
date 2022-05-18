import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import MenuTop from '../components/Admin/MenuTop';

import './LayaoutAdmin.scss';

export default function LayoutAdmin(props) {
  const { children } = props;
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      {/* todo -> Menu Sider */}
      <Layout className="layout-admin">
        <Header className="layout-admin__header">
          <MenuTop />
        </Header>
        <Content className="layout-admin__content">{children}</Content>
        <Footer className="layout-admin__footer">Pablo Osés</Footer>
      </Layout>
    </Layout>
  );
}
