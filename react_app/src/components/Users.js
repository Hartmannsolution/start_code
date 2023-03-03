import React from 'react';
import { deleteUser } from '../services/UserService';
export const Users = ({users, doUpdateUser, setNumberOfUsers }) => {

    if (users.length === 0) return null

    const doDeleteUser = async (e) => {
        console.log('ID: ',e.target.id)
        const result = await deleteUser(e.target.id);
        console.log('Delete result: ',result);
        setNumberOfUsers((numberOfUsers)=>numberOfUsers - 1);
    }

    const UserRow = (user,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index+1}</td>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td><button id={user._id} onClick={doUpdateUser}>edit</button ><button id={user._id} onClick={doDeleteUser}>delete</button></td>
              </tr>
          )
    }

    const userTable = users.map((user,index) => UserRow(user,index))

    return(
        <div className="container">
            <h2>Users</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Number</th>
                    <th>User Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
                </thead>
                <tbody>
                    {userTable}
                </tbody>
            </table>
        </div>
    )
}