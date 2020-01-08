import { actionTypes } from '../actions/posts';


const INITIAL_STATE = {
    data: null,
    isFetching: false,
    lastUpdate: Date.now()
}

const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_POST:
            return { ...state, isFetching: true};
        case actionTypes.RECEIVE_POST:
            return { ...state, isFetching: false, data: action.payload};
        default:
            return state;
    }
};

export default postReducer;
