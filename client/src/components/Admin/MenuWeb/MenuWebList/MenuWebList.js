import React, { useEffect, useState } from 'react';
import {
  Switch,
  List,
  Button,
  Modal as ModalAntd,
  notification,
  Result,
  Popconfirm,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable';
import {
  updateMenuApi,
  activateMenuApi,
  deleteMenuApi,
} from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './MenuWebList.scss';
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm/EditMenuWebForm';

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
        content: (
          <MenuItem
            item={item}
            activateMenu={activateMenu}
            editMenuWebModal={editMenuWebModal}
            deleteMenuWeb={deleteMenuWeb}
          />
        ),
      });
    });
    setListItems(listItemsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setModalContent(
      <AddMenuWebForm
        setReloadMenuWeb={setReloadMenuWeb}
        setIsVisibleModal={setIsVisibleModal}
      />
    );
  };
  const editMenuWebModal = (menu) => {
    setIsVisibleModal(true);
    setModalTitle(`Editando ${menu.title}`);
    setModalContent(
      <EditMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
        menu={menu}
      />
    );
  };

  const deleteMenuWeb = (menu) => {
    const accessToken = getAccessTokenApi();
    deleteMenuApi(accessToken, menu._id)
      .then((response) => {
        notification['success']({ message: response.message });
        setReloadMenuWeb(true);
      })
      .catch((err) => {
        notification['error']({ message: err.message });
      });
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
  const { item, activateMenu, editMenuWebModal, deleteMenuWeb } = props;

  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          onChange={(e) => activateMenu(item, e)}
        />,
        <Button type="primary" onClick={() => editMenuWebModal(item)}>
          <EditOutlined />
        </Button>,
        <Popconfirm
          title="¿Eliminar menú?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={() => deleteMenuWeb(item)}
        >
          <Button type="danger">
            <DeleteOutlined />
          </Button>
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
}
