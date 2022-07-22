import React from 'react';
import { Layout, Tabs } from 'antd';
import { Navigate } from 'react-router-dom';
import Logo from '../../../assets/img/png/logo.png';
import RegisterForm from '../../../components/Admin/RegisterForm/RegisterForm';
import LoginForm from '../../../components/Admin/LoginForm/LoginForm';

import './SignIn.scss';

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  const logoName = "{Pablo Osés}"
  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          {logoName}
        </h1>
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Iniciar sesión</span>} key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab={<span>Registrarse</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
