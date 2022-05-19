import React from 'react';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import Logo from '../../../assets/img/png/logo.png';

import './MenuTop.scss';

export default function MenuTop(props) {
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={Logo}
          alt="logo web Pablo Osés"
        />
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={() => {}}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
