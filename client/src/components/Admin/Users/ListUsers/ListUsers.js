import React, { useEffect, useState } from 'react';
import { Switch, List, Avatar, Button, notification } from 'antd';
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm/EditUserForm';
import { getAvatarApi, activateUserApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

import './ListUsers.scss';

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: 'Mi modal',
    children: '..',
  });
  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActive(!viewUsersActive)}
        />
        <span>
          {viewUsersActive ? 'Usuarios activos' : 'Usuarios inactivos'}
        </span>
      </div>

      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setModalVisible={setModalVisible}
          setModalInfo={setModalInfo}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
      )}
      <Modal
        title={modalInfo.title}
        isVisible={modalVisible}
        setIsVisible={() => setModalVisible(false)}
      >
        {modalInfo.children}
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const { usersActive, setModalVisible, setModalInfo, setReloadUsers } = props;

  const editUser = (user) => {
    setModalVisible(true);
    setModalInfo({
      title: `Editar ${user.name ? user.name : 'usuario'} ${
        user.lastName ? user.lastName : ''
      }`,
      children: (
        <EditUserForm
          user={user}
          setModalVisible={setModalVisible}
          setReloadUsers={setReloadUsers}
        />
      ),
    });
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const deactivateUser = () => {
    const accessToken = getAccessTokenApi();
    activateUserApi(accessToken, false, user._id)
      .then((response) => {
        setReloadUsers(true);
      })
      .catch((err) => {});
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => deactivateUser()}>
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={() => console.log('Borrar usuario')}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                ${user.name ? user.name : '...'}
                ${user.lastName ? user.lastName : '...'}
            `}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = () => {
    const accessToken = getAccessTokenApi();
    activateUserApi(accessToken, true, user._id)
      .then((response) => {
        setReloadUsers(true);
      })
      .catch((err) => {});
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => activateUser()}>
          <CheckCircleOutlined />
        </Button>,
        <Button
          type="danger"
          onClick={() => console.log('Borrar usuario')}
          description="Borrar usuario"
        >
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
              ${user.name ? user.name : '...'}
              ${user.lastName ? user.lastName : '...'}
          `}
        description={user.email}
      />
    </List.Item>
  );
}
