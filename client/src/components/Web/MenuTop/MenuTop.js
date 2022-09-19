import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getMenusApi } from '../../../api/menu';

import './MenuTop.scss';

export default function MenuTop(props) {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getMenusApi().then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <Menu className="menu-top-web" mode="horizontal">
      <Menu.Item className="menu-top-web__logo">
        <Logo />
      </Menu.Item>
      <Menu.Item className="menu-top-web__item">
        <Link to={'/'}>Home</Link>
      </Menu.Item>
      <Menu.Item className="menu-top-web__item">
        <Link to={'/contact'}>Contacto</Link>
      </Menu.Item>
    </Menu>
  );
}

function Logo() {
  return (
    <div className="logo">
      <Link to="/">P</Link>
    </div>
  );
}
