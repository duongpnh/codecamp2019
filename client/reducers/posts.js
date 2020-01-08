import { actionTypes } from '../actions/posts';


const INITIAL_STATE = {
    data: {},
    isFetching: false,
    lastUpdate: Date.now()
}

const postsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_POSTS:
            return { ...state, isFetching: true};
        case actionTypes.RECEIVE_POSTS:
            return { ...state, isFetching: false, data: action.payload};
        default:
            return state;
    }
};

export default postsReducer;
