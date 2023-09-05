import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { deleteRole, fetchAllRole } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState();

  useEffect(() => {
    getAllRoles();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchListRoles() {
      getAllRoles();
    },
  }));

  const getAllRoles = async () => {
    let data = await fetchAllRole();
    if (data && data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  const handleDeleteRole = async (role) => {
    let data = await deleteRole(role.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      getAllRoles();
    }
  };

  return (
    <table className="table table-hover table-bordered mt-3">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">URL</th>
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {listRoles && listRoles.length > 0 ? (
          <>
            {listRoles.map((item, index) => (
              <tr key={`${item.userName}-${index}`}>
                <td>{item.id}</td>
                <td>{item.url}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteRole(item)}
                  >
                    <i className="fa fa-trash-o"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <tr>
            <td colSpan={4}>Not Found User</td>
          </tr>
        )}
      </tbody>
    </table>
  );
});

export default TableRole;
