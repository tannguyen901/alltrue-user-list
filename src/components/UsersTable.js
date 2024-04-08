import React, { useState } from "react";
import EditUserForm from "./EditUserForm";

function UsersTable({ users, onDeleteUser, onUpdateUser }) {
  const [editUserId, setEditUserId] = useState(null);

  const startEdit = (user) => {
    setEditUserId(user.id);
  };

  const cancelEdit = () => {
    setEditUserId(null);
  };

  const handleDelete = (userId) => {
    fetch(`https://reqres.in/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDeleteUser(userId);
        } else {
          throw new Error("Failed to delete the user");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Avatar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editUserId === user.id ? (
              <EditUserForm
                key={user.id}
                user={user}
                onUpdateUser={onUpdateUser}
                cancelEdit={cancelEdit}
              />
            ) : (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>
                  <button onClick={() => startEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
