import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import './RegisterForm.scss';
import {
  minLengthValidation,
  emailValidation,
} from '../../../utils/formValidation';
export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    privacyPolicy: false,
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });

  const changeForm = (e) => {
    if (e.target.name === 'privacyPolicy') {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked, //Con esto sacamos el valor del checkbox
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value, //Con esto el resto de inputs
      });
    }
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (type === 'email') {
      setFormValid({ ...formValid, [name]: emailValidation });
    }
    if (type === 'password') {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }
    if (type === 'checkbox') {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
  };

  const register = () => {
    console.log(formValid);
    const { email, password, repeatPassword, privacyPolicy } = formValid;
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;
    if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      notification['error']({
        message: 'Todos los campos son obligatorios',
      });
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification['error']({
          message: 'Las contraseñas deben coincidir',
        });
      } else {
        // TODO: Conectar con la API y registrar al usuario
      }
    }
  };

  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25' }} />}
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25' }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25' }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={inputs.privacyPolicy}
        >
          He leido y acepto la política de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
