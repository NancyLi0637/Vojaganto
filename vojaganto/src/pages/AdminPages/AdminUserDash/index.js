import React from 'react';
import { Redirect } from "react-router-dom";
import AdminNav from 'components/Admin/AdminNav'
import AdminUserTable from 'components/Admin/AdminUserTable'

import './style.scss'

import { handleInputChange } from "actions"
import { changeUserActive, getUsers } from 'actions/Admin/AdminTable/index';

class AdminUserDash extends React.Component {
    state = {
        users: [],
        search: ""
    }

    componentDidMount() {
        getUsers(this, { search: this.state.search })
    }

    render() {
        const { currUser } = this.props
        if (!currUser || currUser.role !== "admin") {
            return <Redirect to="/admin/login" />
        }

        return (
            <div className="page admin-user-page">
                <AdminNav />
                <div className="admin-user-main">
                    <div className="table-search">
                        <input type="text" className="table-search-input" name="search" placeholder="Search by ID, Username, Name" onChange={(e) => handleInputChange(this, e)} />
                        <button className="table-search-btn" onClick={() => getUsers(this, { search: this.state.search })}>Search</button>
                    </div>
                    <AdminUserTable users={this.state.users} changeUserActive={(user) => changeUserActive(this, user)} />
                </div>
            </div>
        )
    }
}

export default AdminUserDash;