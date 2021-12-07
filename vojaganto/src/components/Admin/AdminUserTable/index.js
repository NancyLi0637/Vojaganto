import React from 'react';
import "./style.scss";

class AdminUserTable extends React.Component {

    render() {
        const { users } = this.props

        return (
            <div>
                <table className="admin-user-table admin-table">
                    <thead>
                        <tr className="admin-table-headerRow">
                            <th className="admin-table-header">
                                User ID
                            </th>
                            <th className="admin-table-header">
                                Username
                            </th>
                            <th className="admin-table-header">
                                Nickname
                            </th>
                            <th className="admin-table-header">
                                Role
                            </th>
                            <th className="admin-table-header">
                                Status
                            </th>
                            <th className="admin-table-header">
                                Last Login
                            </th>
                            <th className="admin-table-header">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            return (
                                <tr key={user._id} className="admin-data-row">
                                    <td>
                                        {user._id}
                                    </td>
                                    <td>
                                        {user.username}
                                    </td>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.role}
                                    </td>
                                    <td>
                                        {user.active ? "Active" : "Inactive"}
                                    </td>
                                    <td>
                                        {user.lastLogin}
                                    </td>
                                    <td className="actions">
                                        {
                                            user.active ?
                                                <button onClick={() => this.props.changeUserActive(user)}>
                                                    Inactivate
                                                </button>
                                                :
                                                <button onClick={() => this.props.changeUserActive(user)}>
                                                    Activate
                                                </button>
                                        }
                                        {
                                            user.role === "admin" ?
                                                <button onClick={() => this.props.changeUserRole(user)}>
                                                    Set to Client
                                                </button>
                                                :
                                                <button onClick={() => this.props.changeUserRole(user)}>
                                                    Set to Admin
                                                </button>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminUserTable;