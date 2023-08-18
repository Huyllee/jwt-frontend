/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchAllUser } from "../../services/userService";

const Users = () => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchListUser();
  }, [currentPage]);

  const fetchListUser = async () => {
    let res = await fetchAllUser(currentPage, currentLimit);
    if (res && res.data && res.data.EC === 0) {
      setListUsers(res.data.DT.users);
      setTotalPages(res.data.DT.totalPages);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

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
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {listUsers && listUsers.length > 0 ? (
              <>
                {listUsers.map((item, index) => (
                  <tr key={`${item.userName}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.userName}</td>
                    <td>{item.Group ? item.Group.name : ""}</td>
                    <td>
                      <button className="btn btn-warning mx-3">Edit</button>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td>Not Found User</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 0 && (
        <div className="user-footer">
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={totalPages}
            pageRangeDisplayed={4}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
