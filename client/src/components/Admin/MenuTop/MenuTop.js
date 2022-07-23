import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import Logo from "../../../assets/img/png/logo.png";
import { logout } from "../../../api/auth";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { pathname } = useLocation();
  const logoName = "{Pablo Osés}";
  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <div className="menu-top__left-logo">
          {logoName}
          <span className="menu-top__left-logo-pathname">{pathname}</span>
        </div>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={() => logoutUser()}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
