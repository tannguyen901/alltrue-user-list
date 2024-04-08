import React, { useState } from "react";

function EditUserForm({ user, onUpdateUser, cancelEdit }) {
  const [editedFirstName, setEditedFirstName] = useState(user.first_name);
  const [editedLastName, setEditedLastName] = useState(user.last_name);
  const [editedEmail, setEditedEmail] = useState(user.email);

  const handleEdit = () => {
    const updatedUserDetails = {
      first_name: editedFirstName,
      last_name: editedLastName,
      email: editedEmail,
    };

    fetch(`https://reqres.in/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update the user");
        }
        return response.json();
      })
      .then((updatedUser) => {
        onUpdateUser({
          ...updatedUser,
          id: user.id,
        });
        cancelEdit();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <tr>
      <td>
        <input
          type="email"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={editedFirstName}
          onChange={(e) => setEditedFirstName(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={editedLastName}
          onChange={(e) => setEditedLastName(e.target.value)}
        />
      </td>
      <td>
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      </td>
      <td>
        <button onClick={handleEdit}>Save</button>
        <button onClick={cancelEdit}>Cancel</button>
      </td>
    </tr>
  );
}

export default EditUserForm;
