import React, { useEffect, useState } from 'react';
import {
  Switch,
  List,
  Button,
  Modal as ModalAntd,
  notification,
  Result,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable';
import { updateMenuApi, activateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './MenuWebList.scss';
import AddMenuWebForm from '../AddMenuWebForm';

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
  const { menus, setReloadMenuWeb } = props;
  const [listItems, setListItems] = useState([]);
  //Modal
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listItemsArray = [];

    menus.forEach((item) => {
      listItemsArray.push({
        content: <MenuItem item={item} activateMenu={activateMenu} />,
      });
    });
    setListItems(listItemsArray);
  }, [menus]);

  const activateMenu = (menu, status) => {
    const accessToken = getAccessTokenApi();
    activateMenuApi(accessToken, menu._id, status)
      .then((response) => {
        console.log(response.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();

    sortedList.forEach((item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateMenuApi(accessToken, _id, { order });
    });
  };

  const addMenuWebModal = () => {
    setIsVisibleModal(true);
    setModalTitle('Crear menú');
    setModalContent(<AddMenuWebForm />);
  };

  return (
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary" onClick={addMenuWebModal}>
          Crear menú
        </Button>
      </div>
      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical" />
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function MenuItem(props) {
  const { item, activateMenu } = props;

  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          onChange={(e) => activateMenu(item, e)}
        />,
        <Button type="primary" onClick={() => console.log('sda')}>
          <EditOutlined />
        </Button>,
        <Button type="danger">
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
}
