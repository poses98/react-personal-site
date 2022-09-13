import React, { useEffect } from 'react';
import { Layout, Tabs } from 'antd';
import { Navigate } from 'react-router-dom';
import Logo from '../../../assets/img/png/logo.png';
import RegisterForm from '../../../components/Admin/RegisterForm/RegisterForm';
import LoginForm from '../../../components/Admin/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { getAccessTokenApi } from '../../../api/auth';

import './SignIn.scss';

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  const { user, isLoading } = useAuth();

  const logoName = '{Pablo Osés}';

  const navigate = useNavigate();

  useEffect(() => {
    if (getAccessTokenApi()) {
      navigate('/admin');
    }
  }, [isLoading, user, navigate]);

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">{logoName}</h1>
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
