import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users, blogs }) => {
  console.log(blogs);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>blog created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {
                  blogs.filter(
                    (b) => b.user[0].id === user.id || b.user[0] === user.id
                  ).length
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
