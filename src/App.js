import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UsersTable from "./components/UsersTable";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching users");
        }
        return response.json();
      })
      .then((data) => setUsers(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleUserAdd = (newUserData) => {
    const [firstName, ...lastNames] = newUserData.name.split(" ");
    const lastName = lastNames.join(" ");
    const randomImageNumber = Math.floor(Math.random() * 12) + 1;

    let email;
    if (lastName) {
      email = `${firstName}.${lastName}@reqres.in`.toLowerCase();
    } else {
      email = `${firstName}@reqres.in`.toLowerCase();
    }

    const newUser = {
      ...newUserData,
      first_name: firstName,
      last_name: lastName,
      email,
      avatar: `https://reqres.in/img/faces/${randomImageNumber}-image.jpg`,
    };

    setUsers(users.concat(newUser));
  };

  const handleUpdateUser = (updatedUserData) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUserData.id ? { ...user, ...updatedUserData } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">User Management System</h1>
      <UsersTable
        users={users}
        onDeleteUser={handleDeleteUser}
        onUpdateUser={handleUpdateUser}
      />
      <UserForm onUserAdd={handleUserAdd} />
    </div>
  );
}

export default App;
