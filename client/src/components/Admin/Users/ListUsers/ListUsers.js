import React, { useEffect, useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm/EditUserForm";
import { getAvatarApi } from "../../../../api/user";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "Mi modal",
    children: "..",
  });
  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActive(!viewUsersActive)}
        />
        <span>
          {viewUsersActive ? "Usuarios activos" : "Usuarios inactivos"}
        </span>
      </div>
      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setModalVisible={setModalVisible}
          setModalInfo={setModalInfo}
        />
      ) : (
        <UsersInactive usersInactive={usersInactive} />
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
  const { usersActive, setModalVisible, setModalInfo } = props;

  const editUser = (user) => {
    setModalVisible(true);
    setModalInfo({
      title: `Editar ${user.name ? user.name : "usuario"} ${
        user.lastName ? user.lastName : ""
      }`,
      children: <EditUserForm user={user} />,
    });
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => <UserActive user={user} editUser={editUser} />}
    />
  );
}

function UserActive(props) {
  const { user, editUser } = props;
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

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => console.log("Desactivar usuario")}>
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={() => console.log("Borrar usuario")}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                ${user.name ? user.name : "..."}
                ${user.lastName ? user.lastName : "..."}
            `}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => console.log("Activar usuario")}
            >
              <CheckCircleOutlined />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Borrar usuario")}
              description="Borrar usuario"
            >
              <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`
                    ${user.name ? user.name : "..."}
                    ${user.lastName ? user.lastName : "..."}
                `}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}
