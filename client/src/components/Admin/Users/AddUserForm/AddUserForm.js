import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { signUpAdminApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import {
  emailValidation,
  minLengthValidation,
} from '../../../../utils/formValidation';
import './AddUserForm.scss';

export default function AddUserForm(props) {
  const { setReloadUsers, setModalVisible } = props;
  const [userData, setUserData] = useState({});

  return (
    <div>
      <AddForm
        userData={userData}
        setUserData={setUserData}
        setReloadUsers={setReloadUsers}
        setModalVisible={setModalVisible}
      />
    </div>
  );
}

function AddForm(props) {
  const { userData, setUserData, setReloadUsers, setModalVisible } = props;
  const { Option } = Select;

  const onChangeForm = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = (e) => {
    console.log(userData);
    const accessToken = getAccessTokenApi();

    if (
      !userData.name ||
      !userData.lastName ||
      !userData.password ||
      !userData.role ||
      !userData.email
    ) {
      notification['error']({
        message: 'Todos los campos son obligatorios',
      });
    } else {
      if (userData.password !== userData.repeatPassword) {
        console.log(userData.password);
        console.log(userData.repeatPassword);

        notification['error']({
          message: 'Las contraseñas deben coincidir',
        });
      } else {
        signUpAdminApi(accessToken, userData)
          .then((result) => {
            notification['success']({
              message: result.message,
            });
            setUserData({});
            setReloadUsers(true);
            setModalVisible(false);
          })
          .catch((e) => {
            notification['error']({
              message: e.message,
            });
          });
      }
    }
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (type === 'email') {
      setUserData({ ...setUserData, [name]: emailValidation(e.target) });
    }
    if (type === 'password') {
      setUserData({ ...setUserData, [name]: minLengthValidation(e.target, 6) });
    }
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
              onChange={(e) => setUserData({ ...userData, role: e })}
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
              value={userData.repeatPassword}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit" block>
          Crear usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
