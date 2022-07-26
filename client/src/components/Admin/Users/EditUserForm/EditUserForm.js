import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  notification,
  Result,
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import {
  updateUserApi,
  getAvatarApi,
  uploadAvatarApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setModalVisible } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });

  const accessToken = getAccessTokenApi();

  useEffect(() => {
    setUserData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = (e) => {
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales",
        });
        return;
      }
    }

    if (!userUpdate.name || !userUpdate.lastName || !userUpdate.email) {
      notification["error"]({
        message: "El nombre, apellidos y email son obligatorios",
      });
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(accessToken, userUpdate.avatar, user._id).then(
        (response) => {
          userUpdate.avatar = response.avatarName;
          updateUserApi(accessToken, userUpdate, user._id).then((result) => {
            notification["success"]({
              message: result.message,
            });
          });
        }
      );
    } else {
      updateUserApi(accessToken, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
      });
    }
    setModalVisible(false);
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;

  const { Option } = Select;

  const onChangeForm = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form className="form-edit" onFinish={updateUser} onChange={onChangeForm}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              name="name"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nombre"
              value={userData.name}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              name="lastName"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Apellido"
              value={userData.lastName}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="email"
              name="email"
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              value={userData.email}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              name="role"
              placeholder="Selecciona el rol de usuario"
              onChange={() => setUserData({ ...userData })}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="password"
              name="password"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Contraseña"
              value={userData.password}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="password"
              name="repeatPassword"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Repita la contraseña"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit" block>
          Actualizar usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
