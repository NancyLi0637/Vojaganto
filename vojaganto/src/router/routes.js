// import MultiLevelRouter from "./MultiLevelRouter";
import HomePage from "pages/Home";
import JourneyPage from "pages/Journey";
import ViewPostingPage from "pages/ViewPosting";
import EditPosting from "pages/EditPosting";
import ProfilePage from "pages/Profile";
import AdminHome from "pages/AdminHome"
import AdminLogin from "pages/AdminLogin"
import AdminUserDash from "pages/AdminUserDash"
import AdminPostDash from "pages/AdminPostDash"


const ROUTES = [
    { path: "/", key: "HOME", exact: true, component: HomePage },
    { path: "/journey/:jid", key: "JOURNEY", exact: true, component: JourneyPage },
    { path: "/trip/:tid", key: "TRIP", exact: true, component: ViewPostingPage },
    { path: "/edit", key: "EDIT", exact: true, component: EditPosting },

    { path: "/profile/:uid", key: "PROFILE", exact: true, component: ProfilePage },
    { path: "/admin-login", key: "ADMINLOGIN", exact: true, component: AdminLogin },
    { path: "/admin-home/:uid", key: "ADMINHOME", exact: true, component: AdminHome },
    { path: "/admin-user-dash/:uid", key: "ADMINUSERDASH", exact: true, component: AdminUserDash },
    { path: "/admin-post-dash/:uid", key: "ADMINPOSTDASH", exact: true, component: AdminPostDash },
];

export default ROUTES;
