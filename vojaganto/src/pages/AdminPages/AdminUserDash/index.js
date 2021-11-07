import React from 'react';
import { Redirect } from "react-router-dom";
import AdminNav from 'components/Admin/AdminNav'
import AdminUserTable from 'components/Admin/AdminUserTable'

import './style.scss'

class AdminUserDash extends React.Component{
    render(){
        const { currUser } = this.props
        if (!currUser || currUser.role != 1) {
            return <Redirect to="/admin/login" />
        }

        // This data will be pull from server
        const users = [
            {
                username: "user1",
                nickname: "abc",
                last_login: Date.now()
            },
            {
                username: "user2",
                nickname: "def",
                last_login: Date.now()
            }
        ]
        return (
            <div class="page admin-user-page">
                <div className="admin-user-main">
                    <AdminNav/>
                    <AdminUserTable users={users}/>
                </div>
            </div>
        )
    }
}

export default AdminUserDash;