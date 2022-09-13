import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import { addMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './AddMenuWebForm.scss';

export default function AddMenuWebForm(props) {
  const { setReloadMenuWeb, setIsVisibleModal } = props;
  const [menuWebData, setMenuWebData] = useState({});

  const addMenu = (e) => {
    let finalData = {
      title: menuWebData.title,
      url: (menuWebData.htpp ? menuWebData : 'http://') + menuWebData.url,
    };
    if (!finalData.title || !finalData.url || !menuWebData.url) {
      notification['error']({
        message: 'Todos los campos son obligatorios',
      });
    } else {
      const accessToken = getAccessTokenApi();
      finalData.active = false;
      finalData.order = 1000; //Cambiar por la longitud del menú + 1

      addMenuApi(accessToken, finalData)
        .then((response) => {
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
          setMenuWebData({});
        })
        .catch((err) => {});
    }
  };

  return (
    <div className="add-menu-web-form">
      <AddForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        addMenu={addMenu}
      />
    </div>
  );
}

function AddForm(props) {
  const { menuWebData, setMenuWebData, addMenu } = props;
  const { Option } = Select;

  const handleFormChange = (e) => {
    setMenuWebData({ ...menuWebData, [e.target.name]: e.target.value });
  };

  const selectBefore = (
    <Select
      defaultValue="http://"
      onChange={(e) => setMenuWebData({ ...menuWebData, http: e })}
      style={{ width: 90 }}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <Form className="form-add" onChange={handleFormChange} onFinish={addMenu}>
      <Form.Item>
        <Input
          name="title"
          prefix={<FontSizeOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Título"
          value={menuWebData.title}
        />
      </Form.Item>
      <Form.Item>
        <Input
          name="url"
          type="url"
          addonBefore={selectBefore}
          placeholder="URL"
          value={menuWebData.url}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear menú
        </Button>
      </Form.Item>
    </Form>
  );
}
