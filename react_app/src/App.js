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
  updateUser,
  login,
  logout
} from './services/UserService'

const emptyUser = { name: '', email: '', password: '',phone: {no: '', description: ''}, hobbies: [''], dateOfBirth: '', address: {street:'', city:'', country:'', zip:''}};

const App = () => {
  const [user, setUser] = useState(emptyUser);
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState({count:0});
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const createOrUpdateUser = (e) => {
    // check mandatory fields:
    if(!user.name || !user.email || !user.password || !user.phone.no) {
      alert('Please fill in all mandatory fields: name, email, password and phone number');
      return;
    }
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
    // name format on the form fields are hobby-0, hobby-1, hobby-2, etc.
    if(e.target.name.startsWith('hobby')) {
      const hobbyNo = e.target.name.split('-')[1];
      if(!user.hasOwnProperty('hobbies')) user.hobbies = [];
      user.hobbies[hobbyNo] = e.target.value;
      setUser({ ...user, hobbies: user.hobbies });
      console.log('hobby: ', e.target.name, e.target.value);
      return;
    }
    if(['street','city','country','zip'].includes(e.target.name)) {
      setUser({ ...user, address: {...user.address, [e.target.name]: e.target.value} });
      return;
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const doLogin = (email, password) => {
    console.log('doLogin: ', email, password  );
    login(email, password, (name) => {
      setLoggedIn(true);
      console.log('logged in as: ', name);
      setUsername(name);
    });
  }

  const doLogOut = () => {
    setLoggedIn(false);
    setUsername('');
    logout();
  }

  return (
    <div className="App">
      <Header doLogin={doLogin} loggedIn={loggedIn} username={username} doLogOut={doLogOut}/>
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
