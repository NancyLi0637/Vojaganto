import React from 'react';

import AdminNav from 'components/AdminNav'

class AdminUserDash extends React.Component{
    render(){
        return (
            <div class="page admin-user-page">
                <div className="admin-user-main">
                    <AdminNav/>
                    <h1>AdminUserDash PAGE</h1>
                </div>
            </div>
        )
    }
}

export default AdminUserDash;