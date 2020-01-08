import REST_API from '../utils/API';
import API, { ROOT } from '../constants/API'

const actionTypes = {
    REQUEST_POSTS: 'POSTS@REQUEST_POSTS',
    RECEIVE_POSTS: 'POSTS@RECEIVE_POSTS',
    REQUEST_POST: 'POSTS@REQUEST_POST',
    RECEIVE_POST: 'POSTS@RECEIVE_POST'
}

export const fetchPosts = (page=1) => async dispatch => {
    try {
        await dispatch({ type: actionTypes.REQUEST_POSTS });
        const res = await REST_API.get(`${ROOT}/${API.POSTS}?page=${page}`);
        await dispatch({ type: actionTypes.RECEIVE_POSTS, payload: res.data.Data });    
    } catch(e) {
        await dispatch({ type: actionTypes.RECEIVE_POSTS, payload: {} });
    }
}

export const fetchPostById = (id) => async dispatch => {
    try {
        await dispatch({ type: actionTypes.REQUEST_POST });
        const res = await REST_API.get(`${ROOT}/${API.POSTS}/${id}`);
        await dispatch({ type: actionTypes.RECEIVE_POST, payload: res.data.Data });    
    } catch(e) {
        await dispatch({ type: actionTypes.RECEIVE_POST, payload: [] });
    }
}

export const createNewPost = (post, push) => async dispatch => {
    try {
        const res = await REST_API.post(`${ROOT}/${API.POSTS}`, post);
        await dispatch(fetchPosts());
        push('/');    
    } catch(e) {
        await dispatch({ type: actionTypes.RECEIVE_POST, payload: [] });
    }
}

export {actionTypes};