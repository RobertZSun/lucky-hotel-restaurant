import {createStore} from "redux";

const initialState = {
    userToken: null,
    isLoggedIn: false,
    expiresOn: null,
    timer: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "login":
            localStorage.setItem("token", action.payload.idToken);
            localStorage.setItem("expiresOn", action.payload.expiresDate.getTime().toString());
            return {userToken: action.payload.idToken, isLoggedIn: true, expiresOn: action.payload.expiresDate, timer: action.payload.timer};
        case "autoLogin":
            return {userToken: action.payload.idToken, isLoggedIn: action.payload.isLoggedIn, expiresOn: action.payload.expiresDate, timer: action.payload.timer};
        case "signup":
            localStorage.setItem("token", action.payload.idToken);
            localStorage.setItem("expiresOn", action.payload.expiresDate.getTime().toString());
            return {userToken: action.payload.idToken, isLoggedIn: true, expiresOn: action.payload.expiresDate, timer: action.payload.timer};
        case "logout":
            localStorage.removeItem("token");
            localStorage.removeItem("expiresOn");
            if (state.timer){
                clearTimeout(state.timer);
            }
            return initialState;
        default:
            return initialState;
    }
};

const AuthStore = createStore(authReducer);

export default AuthStore;