/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/userService";

const Users = () => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUser();
  }, []);

  const fetchListUser = async () => {
    let res = await fetchAllUser();
    if (res && res.data && res.data.EC === 0) {
      setListUsers(res.data.DT);
    }
  };

  console.log(listUsers);

  return (
    <div className="manage-users-container container">
      <div className="user-header">
        <div className="title">
          <h3>Table Users</h3>
        </div>
        <div className="actions">
          <button className="btn btn-success">Refresh</button>
          <button className="btn btn-primary">Add new user</button>
        </div>
      </div>
      <div className="user-body">
        <table className="table table-hover table-bordered mt-3">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Id</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Group</th>
            </tr>
          </thead>
          <tbody>
            {listUsers && listUsers.length > 0 ? (
              <>
                {listUsers.map((item, index) => (
                  <tr key={`${item.userName}-${item.index}`}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.userName}</td>
                    <td>{item.Group ? item.Group.name : ""}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>Not Found User</tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="user-footer">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Users;
