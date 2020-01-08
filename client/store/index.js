import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducers from '../reducers';

const store = createStore(
    appReducers,
    applyMiddleware(thunk)
);

export default store;
