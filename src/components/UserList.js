import React from "react";

const UserList = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <table>
          <tr>
            <th> </th>
            <th>blog created</th>
          </tr>
          <tr>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        </table>
      ))}
    </>
  );
};

export default UserList;
