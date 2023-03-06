import React from 'react';
import { deleteUser } from '../services/UserService';
import ToolTip from './tooltip/ToolTip';
export const Users = ({users, insertUser, setNumberOfUsers }) => {

    if (users.length === 0) return null

    const doDeleteUser = async (e) => {
        const result = await deleteUser(e.target.id);
        setNumberOfUsers((numberOfUsers)=>numberOfUsers - 1);
    }

    const UserRow = (user,index) => {
        const addressString = user.address? user.address.street + ', ' + user.address.zip + ', ' + user.address.city + ', ' + user.address.country : '';
        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index+1}</td>
                  <td>{user._id}</td>
                  <td>
                    <ToolTip text={user.name} message={addressString}/>
                    </td>
                  <td>{user.email}</td>
                  <td>{user.phone?user.phone.no:''}</td>
                  <td>{user.password}</td>
                  <td><button id={user._id} onClick={insertUser}>edit</button><button id={user._id} onClick={doDeleteUser}>delete</button></td>
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
                    <th>Phone</th>
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