import React, { useState } from "react";

function UserForm({ onUserAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error posting data");
        }
        return response.json();
      })
      .then((data) => {
        const newUser = {
          ...data,
          name: data.name,
        };
        onUserAdd(newUser);
        setName("");
      })
      .catch((error) => console.error("Error posting data: ", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;
