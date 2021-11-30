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
                                Username
                            </th>
                            <th className="admin-table-header">
                                Nickname
                            </th>
                            <th className="admin-table-header">
                                Last Login
                            </th>
                            <th className="admin-table-header">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="admin-data-row">
                                <td>
                                    {user.username}
                                </td>
                                <td>
                                    {user.nickname}
                                </td>
                                <td>
                                    {user.lastLogin}
                                </td>
                                <td className="actions">
                                    <button onClick={() => this.props.inactivateUser(user)}>
                                        Inactivate
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminUserTable;