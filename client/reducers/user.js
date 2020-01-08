import { actionTypes } from '../actions/user';


const INITIAL_STATE = {
    data: null,
    isFetching: false,
    lastUpdate: Date.now()
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_USER_INFO:
            return { ...state, isFetching: true};
        case actionTypes.RECEIVE_USER_INFO:
            return { ...state, isFetching: false, data: action.payload};
        default:
            return state;
    }
};

export default userReducer;
