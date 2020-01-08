import Home from '../pages/Home'
import Details from '../pages/Details'
import Login from '../pages/Login'
import UserProfile from '../pages/UserProfile'
import PostCreator from '../pages/PostCreator'
import Register from '../pages/Register'


const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/posts",
        exact: true,
        component: Home
    },
    {
        path: "/posts/:id",
        component: Details,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/user/profile",
        component: UserProfile
    },
    {
        path: "/submit",
        component: PostCreator
    },
    {
        path: "/register",
        component: Register
    }
]

export default routes