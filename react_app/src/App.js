import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { Users } from './components/Users'
import { DisplayBoard } from './components/DisplayBoard'
import FormUser from './components/FormUser'
import {
  // getAllUsers, 
  getAllUsersWithAdress,
  // getUserById,
  createUser,
  updateUser
} from './services/UserService'

const emptyUser = { name: '', email: '', password: '',phone: {no: '', description: ''}};

const App = () => {
  const [user, setUser] = useState(emptyUser);
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState({count:0});

  const createOrUpdateUser = (e) => {
    if(!user._id) { // create new user if user from the form has no id
    createUser(user)
      .then(response => {
        setNumberOfUsers({...numberOfUsers, count: numberOfUsers.count + 1});
      });
    } else {
      console.log('update user with id: ', user._id);
      updateUser(user)
      .then(response => {
        setNumberOfUsers({...numberOfUsers});
      });
    }
  }

  const insertUser = (e) => {
    e.preventDefault();
    const editUser = users.find(user => user._id === e.target.id);
    setUser(editUser);
  }

  useEffect(() => {
    getAllUsersWithAdress()
      .then(users => {
        setUsers(users);
        if(numberOfUsers.count === 0) setNumberOfUsers({...numberOfUsers, count:users.length});
      });
  }, [numberOfUsers]);

  const onChangeForm = (e) => {
    e.preventDefault();
    if(e.target.name === 'phone') {
      setUser({ ...user, phone: {...user.phone, no: e.target.value} });
      return;
    }
    if(e.target.name === 'phone_type') {
      setUser({ ...user, phone: {...user.phone, description: e.target.value} });
      return;
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <div className="App">
      <Header />
      <div className="container mrgnbtm">
        <div className="row">
          <div className="col-md-8">
            <FormUser user={user} onChangeForm={onChangeForm} createOrUpdateUser={createOrUpdateUser} insertUser={insertUser} />
          </div>
          <div className="col-md-4">
            <DisplayBoard numberOfUsers={numberOfUsers.count} />
          </div>
        </div>
      </div>
      <div className="row mrgnbtm">
        <Users users={users} insertUser={insertUser} setNumberOfUsers={setNumberOfUsers} setUser={setUser}/>
      </div>
    </div>
  );
}

export default App;
