import React from 'react';

import AdminNav from 'components/Admin/AdminNav'
import AdminUserTable from 'components/Admin/AdminUserTable'

import './style.scss'

class AdminUserDash extends React.Component{
    render(){
        const {users} = this.props
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