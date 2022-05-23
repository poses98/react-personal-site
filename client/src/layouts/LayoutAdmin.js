import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import useAuth from '../hooks/useAuth';

import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';

import './LayoutAdmin.scss';

export default function LayoutAdmin(props) {
  const { children } = props;
  const { user, isLoading } = useAuth();
  const [menuCollapsed, setmenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/admin/login');
    }
  }, [user, isLoading, navigate]);
  if (user && !isLoading) {
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
  return null;
}
