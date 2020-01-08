import { combineReducers } from 'redux';
import Posts from "./posts";
import Post from './post';
import User from './user';
import Community from './communities';

export default combineReducers({
    posts: Posts,
    post: Post,
    userInfo: User,
    communities: Community
});
