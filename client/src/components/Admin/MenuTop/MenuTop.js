import React from 'react';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import Logo from '../../../assets/img/png/logo.png';
import {logout} from '../../../api/auth'

import './MenuTop.scss';

export default function MenuTop(props) {
  const logoName = "{Pablo Osés}"

  const logoutUser = () => {
    logout();
    window.location.reload();
  }

  return (
    <div className="menu-top">
      <div className="menu-top__left">
      <h1 className='menu-top__left-logo'>{logoName}</h1>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={() => logoutUser()}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
