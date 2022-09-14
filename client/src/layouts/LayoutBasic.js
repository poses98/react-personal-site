import React from 'react';
import { Layout, Row, Col } from 'antd';
import MenuTop from '../components/Web/MenuTop/MenuTop';

export default function LayoutAdmin(props) {
  const { children } = props;
  const { Header, Content, Footer } = Layout;

  return (
    <Row>
      <Col lg={4}></Col>
      <Col lg={16}>
        <MenuTop />
        {children}
        <p>Footer</p>
      </Col>
      <Col lg={4}></Col>
    </Row>
  );

  /* return (
    <Layout>
      <Layout>
        <Content>{children}</Content>
        <Footer>Pablo Osés</Footer>
      </Layout>
    </Layout>
  ); */
}
