import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { Users } from './components/Users'
import { DisplayBoard } from './components/DisplayBoard'
import FormUser from './components/FormUser'
import { getAllUsers, createUser, updateUser  } from './services/UserService'

const App = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  const doCreateUser = (e) => {
    createUser(user)
      .then(response => {
        setNumberOfUsers((numberOfUsers)=>numberOfUsers + 1);
      });
  }
  const doUpdateUser = (e) => {
    updateUser(user)
      .then(response => {
        setNumberOfUsers((numberOfUsers)=>numberOfUsers + 1);
      });
  }

  useEffect(()=>{
    getAllUsers()
      .then(users => {
        setUsers(users);
        setNumberOfUsers(users.length);
      });
  },[numberOfUsers]);

  const onChangeForm = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <div className="App">
      <Header/>
      <div className="container mrgnbtm">
        <div className="row">
          <div className="col-md-8">
            <FormUser user={user} onChangeForm={onChangeForm} createUser={doCreateUser} updateUser={doUpdateUser} />
          </div>
          <div className="col-md-4">
            <DisplayBoard numberOfUsers={numberOfUsers} />
          </div>
        </div>
      </div>
      <div className="row mrgnbtm">
        <Users users={users} doUpdateUser={doUpdateUser} setNumberOfUsers={setNumberOfUsers} setUser={setUser}></Users>
      </div>
    </div>
  );
}

export default App;
