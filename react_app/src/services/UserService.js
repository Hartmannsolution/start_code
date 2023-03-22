import jwt_decode from 'jwt-decode';

export async function getAllUsers() {
    const response = await fetch(`/api/user`);
    return await response.json();
}

export async function getAllUsersWithAdress() {
    const response = await fetch(`/api/user/withaddress`);
    const authHeader = await response.headers.get('authorization');
    if(authHeader){
        console.log('AUTHENTICATION HEADER: ',authHeader);
        localStorage.setItem('token', authHeader);
    }
    return await response.json();
}

export async function getUserById(id) {
    const response = await fetch(`/api/user/${id}`);
    return await response.json();
}

export async function deleteUser(id) {
    const response = await fetch(`/api/user/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

export async function createUser(user) {
    console.log(user, "USER");
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      })
    return await response.json();
}

export async function updateUser(user) {
    const response = await fetch(`/api/user/${user._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      })
    return await response.json();
}

export async function login(email, password, cb) {
    console.log(email,password);
    const response = await fetch(`/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })
    const data = await response.json();
    console.log(data)
    localStorage.setItem('token', data.token);
    const decodedToken = jwt_decode(data.token);
    localStorage.setItem('name', decodedToken.name);
    cb(decodedToken.name);
}
export async function checkToken() {
    const response = await fetch(`/api/validatetoken`, {
        method: 'GET',
        headers: {'authorization': localStorage.getItem('token')}
    });
    const res = await response.json();
    if(res.message === "valid") {
        return true;
    } else {
        return false;
    }
}

export async function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
}