import React, { useState } from 'react';
import { Form, Button, notification, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import {
  minLengthValidation,
  emailValidation,
} from '../../../utils/formValidation';
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

import './LoginForm.scss';

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const onChangeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value, //Con esto el resto de inputs
    });
  };

  const formValidation = (e) => {
    const { type, name } = e.target;

    if (type === 'email') {
      setFormValid([{ ...formValid, [name]: emailValidation(e.target) }]);
    }
    if (type === 'password') {
      setFormValid([
        { ...formValid, [name]: minLengthValidation(e.target, 6) },
      ]);
    }
  };

  const login = async () => {
    const result = await signInApi(inputs);

    if (result.message) {
      notification['error']({
        message: result.message,
      });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      notification['success']({
        message: 'Login correcto',
      });
      navigate('/admin', { replace: true });
    }

    console.log(result);
  };

  return (
    <Form className="login-form" onFinish={login} onChange={onChangeForm}>
      <Form.Item>
        <Input
          prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="login-form__input"
          autoComplete="username"
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
          autoComplete="current-password"
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form__button">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
