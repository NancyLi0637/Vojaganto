// import MultiLevelRouter from "./MultiLevelRouter";
import HomePage from "pages/Home";
import JourneyPage from "pages/Journey";
import ViewPostingPage from "pages/ViewPosting";
import EditPosting from "pages/EditPosting";
import ProfilePage from "pages/Profile";


const ROUTES = [
    { path: "/", key: "HOME", exact: true, component: HomePage },
    { path: "/journey/:jid", key: "JOURNEY", exact: true, component: JourneyPage },
    { path: "/trip/:pid", key: "TRIP", exact: true, component: ViewPostingPage },
    { path: "/edit", key: "EDIT", exact: true, component: EditPosting },

    { path: "/profile/:uid", key: "PROFILE", exact: true, component: ProfilePage },
];

export default ROUTES;
