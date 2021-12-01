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
                            if (user.status === "active") {
                                return (
                                    <tr key={user._id} className="admin-data-row">
                                        <td>
                                            {user._id}
                                        </td>
                                        <td>
                                            {user.username}
                                        </td>
                                        <td>
                                            {user.nickname}
                                        </td>
                                        <td>
                                            {user.role}
                                        </td>
                                        <td>
                                            {user.status}
                                        </td>
                                        <td>
                                            {user.lastLogin}
                                        </td>
                                        <td className="actions">
                                            <button onClick={() => this.props.changeUserStatus(user, "inactive")}>
                                                Inactivate
                                            </button>
                                        </td>
                                    </tr>
                                )
                            } else if (user.status === "inactive") {
                                return (
                                    <tr key={user._id} className="admin-data-row">
                                        <td>
                                            {user._id}
                                        </td>
                                        <td>
                                            {user.username}
                                        </td>
                                        <td>
                                            {user.nickname}
                                        </td>
                                        <td>
                                            {user.role}
                                        </td>
                                        <td>
                                            {user.status}
                                        </td>
                                        <td>
                                            {user.lastLogin}
                                        </td>
                                        <td className="actions">
                                            <button onClick={() => this.props.changeUserStatus(user, "active")}>
                                                Activate
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }

                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminUserTable;