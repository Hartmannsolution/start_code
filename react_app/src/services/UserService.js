export async function getAllUsers() {
    const response = await fetch(`/api/user`);
    return await response.json();
}

export async function getAllUsersWithAdress() {
    const response = await fetch(`/api/userswithaddress`);
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