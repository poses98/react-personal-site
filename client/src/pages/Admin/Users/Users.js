import React, { useState, useEffect } from "react";
import { getUsersApi } from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";

import "./Users.scss";

export default function Users() {
  const [users, setUsers] = useState([]);
  const token = getAccessTokenApi();

  useEffect(() => {
    getUsersApi(token).then((response) => {
      setUsers(response.json());
    });
  }, [token]);

  return (
    <div>
      <h2>Users</h2>
      <div></div>
    </div>
  );
}
