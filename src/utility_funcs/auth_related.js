const API_KEY = "AIzaSyAt6HRi3sketQyFJYLFcA5KB6R8IjyvrW8";


async function signup(email, password) {
    let token;
    const urlToPost = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    const requestConfig = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        }),
    };
    try {
        const response = await fetch(urlToPost, requestConfig);
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error("发送注册请求失败！" + errorMessage.error.message);
        }
        token = await response.json();
    } catch (error) {
        console.error(error);
        return Promise.reject(error.message);
    }
    return Promise.resolve(token.idToken);
}

async function login(email, password) {

    let token;
    const urlToPost = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    const requestConfig = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        }),
    };
    try {
        const response = await fetch(urlToPost, requestConfig);
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error("发送登录请求失败！" + errorMessage.error.message);
        }
        token = await response.json();
        // console.log(token);
    } catch (error) {
        console.error(error);
        return Promise.reject(error.message);

    }
    return Promise.resolve(token);
}

async function getSecretKey() {
    let secret_key;
    const urlToFetch = 'https://lucky-hotel-default-rtdb.asia-southeast1.firebasedatabase.app/secretKey.json';
    try {
        const response = await fetch(urlToFetch, {method: 'get'});
        if (!response.ok) {
            throw new Error("请求密钥失败！");
        }
        secret_key = await response.json();
    } catch (error) {
        console.error(error);
    }
    return Promise.resolve(secret_key);
}

export {
    login,
    signup,
    getSecretKey
};