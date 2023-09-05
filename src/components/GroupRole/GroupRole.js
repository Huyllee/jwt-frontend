import React, { useState, useEffect } from "react";
import "./GroupRole.scss";
import { fetchAllGroup } from "../../services/userService";
import { fetchAllRole, fetchRoleByGroup } from "../../services/roleService";
import { toast } from "react-toastify";
import _ from "lodash";

const GroupRole = () => {
  const [userGroup, setUserGroup] = useState([]);
  const [listRoles, setListRoles] = useState();
  const [selectGroup, setSelectGroup] = useState("");
  const [assignRoleByGroup, setAssignRoleByGroup] = useState([]);

  useEffect(() => {
    getUserGroup();
    getAllRoles();
  }, []);

  const getUserGroup = async () => {
    let res = await fetchAllGroup();
    if (res && res && res.EC === 0) {
      setUserGroup(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  const getAllRoles = async () => {
    let data = await fetchAllRole();
    if (data && data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  const handleOnchangeGroup = async (value) => {
    setSelectGroup(value);
    if (value) {
      let data = await fetchRoleByGroup(value);
      if (data && data.EC === 0) {
        let result = buildDataRoleByGroup(data.DT.Roles, listRoles);
        setAssignRoleByGroup(result);
      }
    }
  };

  const buildDataRoleByGroup = (groupRole, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let object = {};
        object.id = role.id;
        object.url = role.url;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRole && groupRole.length > 0) {
          object.isAssigned = groupRole.some((item) => item.url === object.url);
        }
        result.push(object);
      });
    }
    return result;
  };

  const handleSelectRole = (value) => {
    const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
    let foundIndex = _assignRoleByGroup.findIndex(
      (item) => +item.id === +value
    );
    if (foundIndex > -1) {
      _assignRoleByGroup[foundIndex].isAssigned =
        !_assignRoleByGroup[foundIndex].isAssigned;
    }
    setAssignRoleByGroup(_assignRoleByGroup);
  };

  return (
    <div className="group-role-container">
      <div className="container">
        <div className="mt-3">
          <h4>Group Role</h4>
          <div className="assign-group-role">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Select Group (<span className="red">*</span>)
              </label>
              <select
                className={"form-select"}
                onClick={(e) => handleOnchangeGroup(e.target.value)}
              >
                <option value="">Please choose your group</option>
                {userGroup.length > 0 &&
                  userGroup.map((item, index) => (
                    <option key={`${item.name}-${index}`} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <hr />
            {selectGroup && (
              <div className="roles">
                <h5>Assign Roles</h5>
                {assignRoleByGroup &&
                  assignRoleByGroup.length > 0 &&
                  assignRoleByGroup.map((item, index) => (
                    <div className="form-check" key={`list-role-${index}`}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={item.id}
                        id={`list-role-${index}`}
                        checked={item.isAssigned}
                        onChange={(e) => handleSelectRole(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`list-role-${index}`}
                      >
                        {item.url}
                      </label>
                    </div>
                  ))}
                <div className="mt-3">
                  <button className="btn btn-warning">Save</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupRole;
