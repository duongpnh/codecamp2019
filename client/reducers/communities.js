import { actionTypes } from '../actions/communities';


const INITIAL_STATE = {
    data: null,
    isFetching: false,
    lastUpdate: Date.now()
}

const communitiesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_COMMUNITIES:
            return { ...state, isFetching: true};
        case actionTypes.RECEIVE_COMMUNITIES:
            return { ...state, isFetching: false, data: action.payload};
        default:
            return state;
    }
};

export default communitiesReducer;
