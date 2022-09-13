import React, { useEffect, useState } from 'react';
import { Input, Form, Select, Button, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import { updateMenuApi } from '../../../../api/menu';

import './EditMenuWebForm.scss';

export default function EditMenuWebForm(props) {
  const { menu, setIsVisibleModal, setReloadMenuWeb } = props;
  const [menuData, setMenuData] = useState(menu);

  useEffect(() => {
    setMenuData(menu);
  }, [menu]);

  const updateMenu = () => {
    if (!menuData.title || !menuData.url) {
      notification['error']({ message: 'Todos los campos son obligatorios' });
    } else {
      const accessToken = getAccessTokenApi();
      updateMenuApi(accessToken, menu._id, menuData)
        .then((response) => {
          notification['success']({
            message: response,
          });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
        })
        .catch((err) => {
          notification['error']({
            message: 'Error del servidor\nInténtelo más tarde',
          });
        });
    }
  };

  return (
    <div>
      <EditForm
        menuData={menuData}
        setMenuData={setMenuData}
        updateMenu={updateMenu}
      />
    </div>
  );
}

function EditForm(props) {
  const { menuData, setMenuData, updateMenu } = props;

  const handleFormChange = (e) => {
    setMenuData({ ...menuData, [e.target.name]: e.target.value });
  };

  return (
    <Form
      className="edit-menu-form"
      onChange={handleFormChange}
      onFinish={updateMenu}
    >
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          type="text"
          name="title"
          value={menuData.title}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          type="url"
          name="url"
          value={menuData.url}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit" block>
          Actualizar menú
        </Button>
      </Form.Item>
    </Form>
  );
}
