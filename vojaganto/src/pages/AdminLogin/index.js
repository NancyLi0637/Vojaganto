import React from 'react';
import AdminLoginForm from 'components/AdminLoginForm';
import './style.scss'

class AdminLogin extends React.Component{

    render(){
        return (
            <div className="admin-login">
                <div className="bg-img"></div>
                <AdminLoginForm/>
            </div>
        )
    }
}

export default AdminLogin;