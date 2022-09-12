import React, { useState, useEffect } from 'react';
import { getMenusApi } from '../../../api/menu';
import { getAccessTokenApi } from '../../../api/auth';
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList/MenuWebList';

export default function MenuWeb() {
  const [menus, setMenus] = useState([]);
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

  useEffect(() => {
    const accessToken = getAccessTokenApi();
    getMenusApi(accessToken).then((response) => {
      setMenus(response.menus);
    });
    setReloadMenuWeb(false);
  }, [reloadMenuWeb]);

  return (
    <div className="menu-web">
      <MenuWebList menus={menus} setReloadMenuWeb={setReloadMenuWeb} />
    </div>
  );
}
