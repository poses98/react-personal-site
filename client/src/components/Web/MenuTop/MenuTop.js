import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getActiveMenusApi } from '../../../api/menu';

import './MenuTop.scss';

export default function MenuTop(props) {
  const [menuData, setMenuData] = useState([]);

  console.log(menuData);

  useEffect(() => {
    getActiveMenusApi().then((response) => {
      const arrayMenu = [];
      response.menus.forEach((element) => {
        arrayMenu.push(element);
      });
      setMenuData(arrayMenu);
    });
  }, []);

  return (
    <Menu className="menu-top-web" mode="horizontal">
      <Menu.Item key="logo" className="menu-top-web__logo">
        <Logo />
      </Menu.Item>
      {menuData.map((item) => {
        return (
          <Menu.Item key={item.title} className="menu-top-web__item">
            <Link to={item.url}>{item.title}</Link>
          </Menu.Item>
        );
      })}
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
