import REST_API from '../utils/API';
import API, { ROOT_USER } from '../constants/API';

export const actionTypes = {
    REQUEST_USER_INFO: 'USER@REQUEST_USER_INFO',
    RECEIVE_USER_INFO: 'USER@RECEIVE_USER_INFO'
}

export const userLogin = (user, done) => async dispatch => {
    try {
        const res = await REST_API.post(`${ROOT_USER}/${API.USER_LOGIN}`, user);
        localStorage.setItem('token', res.data.Data.token);
        dispatch(fetchUserInfo())
        done('/')
    } catch(e) {
        console.log(e);
    }
}

export const userRegister = (user, done) => async dispatch => {
    try {
        const res = await REST_API.post(`${ROOT_USER}/${API.USER_REGISTER}`, user);
        if (res.data.Data) {
            done('/login')
        }
    } catch(e) {
        console.log(e);
    }
}

export const actReceiveUserInfo = (data) => ({ type: actionTypes.RECEIVE_USER_INFO, payload: data })

export const fetchUserInfo = () => async dispatch => {
    try {
        if ("token" in localStorage) {
            const token = localStorage.getItem("token")
            await dispatch({ type: actionTypes.REQUEST_USER_INFO });
            const res = await REST_API.get(`${ROOT_USER}/${API.USER_INFO}`, { headers: {
                "Authorization": `Bearer ${token}`
            }});
            if (res.data.Data) {
                await dispatch(actReceiveUserInfo(res.data.Data))
            } else {
                localStorage.removeItem("token")
            }
        }
        
    } catch(e) {
        await dispatch({ type: actionTypes.RECEIVE_USER_INFO, payload: null });
    }
}
