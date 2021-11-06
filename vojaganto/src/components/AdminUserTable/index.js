import React from 'react';
import "./style.scss";

class AdminUserTable extends React.Component {

    render() {
        // const { users } = this.props
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

        const format_users = users.map(user => ({
            username: user.username,
            nickname: user.nickname,
            last_login: new Date(user.last_login)
        }))
        return (
            <div>
                <table className="AdminUserTable">
                    <tr className="AdminUserHeaderRow">
                        <th className="AdminUserHeader">
                            Username
                        </th>
                        <th className="AdminUserHeader">
                            Nickname
                        </th>
                        <th className="AdminUserHeader">
                            Last Login
                        </th>
                    </tr>
                    {format_users.map(user => (
                        <tr className="AdminUserRow">
                            <td className="AdminUserData LeftCol">
                                {user.username}
                            </td>
                            <td className="AdminUserData">
                                {user.nickname}
                            </td>
                            <td className="AdminUserData RightCol">
                                {
                                    "Date: " + user.last_login.getDate() +
                                    "/" + (user.last_login.getMonth() + 1) +
                                    "/" + user.last_login.getFullYear() +
                                    " " + user.last_login.getHours() +
                                    ":" + user.last_login.getMinutes() +
                                    ":" + user.last_login.getSeconds()}
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }
}

export default AdminUserTable;