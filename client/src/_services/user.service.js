import {authHeader} from "../_helpers";

export const userService ={
    login,
    logout,
    register,
    getUsers,
    getUserById,
    update,
    delete: _delete
}

function login(username,password) {
    const requestOptions={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({username,password})
    };

    return fetch(`/api/users/authenticate`,requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user',JSON.stringify(user));
            return user;
        })
}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/api/users/register`, requestOptions).then(handleResponse);
}

function getUsers() {

    return fetch(`/api/users`,{method:'GET'}).then(handleResponse);
}

function getUserById(id) {

    return fetch(`/api/users/${id}`,{method:'GET'}).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/api/users/${user._id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`/api/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response){
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if(!response.ok){
            if(response.status === 401){
                logout();
                window.location.reload(true);
            }

            return Promise.reject(
                (data && data.message) || response.statusText
            );
        }
        return Promise.resolve(data);
    })
}