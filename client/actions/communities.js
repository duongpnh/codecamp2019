import REST_API from '../utils/API';
import API, { ROOT_COMMUNITY } from '../constants/API'

const actionTypes = {
    REQUEST_COMMUNITIES: 'COMMUNITIES@REQUEST_COMMUNITIES',
    RECEIVE_COMMUNITIES: 'COMMUNITIES@RECEIVE_COMMUNITIES'
}

export const fetchCommunities = () => async dispatch => {
    try {
        await dispatch({ type: actionTypes.REQUEST_COMMUNITIES });
        const res = await REST_API.get(`${ROOT_COMMUNITY}/${API.COMMUNITIES}`);
        await dispatch({ type: actionTypes.RECEIVE_COMMUNITIES, payload: res.data.data });    
    } catch(e) {
        await dispatch({ type: actionTypes.RECEIVE_COMMUNITIES, payload: [] });
    }
}

export {actionTypes};