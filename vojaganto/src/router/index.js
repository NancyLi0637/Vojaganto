import React from "react";

import { Route, Switch } from "react-router-dom";


import HomePage from "pages/Home";
import JourneyPage from "pages/Journey";
import ViewPostingPage from "pages/ViewPosting";
import EditPostingPage from "pages/EditPosting";
import ProfilePage from "pages/Profile";
import AdminHome from "pages/AdminHome"
import AdminLogin from "pages/AdminLogin"
import AdminUserDash from "pages/AdminUserDash"
import AdminPostDash from "pages/AdminPostDash"

export default class RenderRoutes extends React.Component {

    render() {
        const { currUser } = this.props
        return (
            <Switch>
                {/* HOME */}
                <Route exact path="/" render={(props) => <HomePage currUser={currUser} {...props} />} />

                {/* VIEW */}
                <Route exact path="/journey/:jid" render={(props) => <JourneyPage currUser={currUser} {...props} />} />
                <Route exact path="/trip/:pid" render={(props) => <ViewPostingPage currUser={currUser} {...props} />} />

                {/* EDIT */}
                <Route exact path="/new-posting" render={(props) => <EditPostingPage currUser={currUser} {...props} />} />
                <Route exact path="/edit/:pid" render={(props) => <EditPostingPage currUser={currUser} {...props} />} />

                {/* PROFILE */}
                <Route exact path="/profile/:uid" render={(props) => <ProfilePage currUser={currUser} {...props} />} />

                {/* ADMIN */}
                <Route exact path="/admin/login" render={(props) => <AdminLogin currUser={currUser} {...props} />} />
                <Route exact path="/admin/home" render={(props) => <AdminHome currUser={currUser} {...props} />} />
                <Route exact path="/admin/users" render={(props) => <AdminUserDash currUser={currUser} {...props} />} />
                <Route exact path="/admin/postings" render={(props) => <AdminPostDash currUser={currUser} {...props} />} />

                {/* NOT FOUND */}
                <Route component={() => <h1>Not Found!</h1>} />
            </Switch>
        )
    }
}

