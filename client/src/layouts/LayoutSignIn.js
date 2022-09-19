import React from 'react';
import { Layout, Row, Col } from 'antd';

export default function LayoutSignIn(props) {
  const { children } = props;
  const { Content, Footer } = Layout;

  return (
    <Layout>
      <Layout>
        <Content>{children}</Content>
        <Footer>Pablo Osés</Footer>
      </Layout>
    </Layout>
  );
}
