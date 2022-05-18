import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
export default function LayoutAdmin(props) {
  const { children } = props;
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <Layout>
        <Content>{children}</Content>
        <Footer>Pablo Osés</Footer>
      </Layout>
    </Layout>
  );
}
