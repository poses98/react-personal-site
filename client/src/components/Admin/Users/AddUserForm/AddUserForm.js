import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { signUpAdminApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

import './AddUserForm.scss';

export default function AddUserForm(props) {
  const { setReloadUser, setModalVisible } = props;
  const [userData, setUserData] = useState({});

  const addUser = (e) => {
    const accessToken = getAccessTokenApi();
  };

  return (
    <div>
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
}

function AddForm(props) {
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;

  const onChangeForm = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form className="form-add" onFinish={addUser} onChange={onChangeForm}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              name="name"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Nombre"
              value={userData.name}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              name="lastName"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Apellido"
              value={userData.lastName}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="email"
              name="email"
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              value={userData.email}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              name="role"
              placeholder="Selecciona el rol de usuario"
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="password"
              name="password"
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Contraseña"
              value={userData.password}
              autoComplete="new-password"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="password"
              name="repeatPassword"
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Repita la contraseña"
              autoComplete="new-password"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit" block>
          Actualizar usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
