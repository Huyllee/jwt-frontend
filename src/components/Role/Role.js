import React, { useState, useEffect } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createNewRole } from "../../services/roleService";

const Role = (props) => {
  const dataChildDefault = {
    url: "",
    description: "",
    isValid: true,
  };
  const [listChild, setListChild] = useState({
    child1: dataChildDefault,
  });

  const handleOnChangeInput = (name, value, key) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[key][name] = value;
    if (value && name === "url") {
      _listChild[key]["isValid"] = true;
    }
    setListChild(_listChild);
  };

  const handleAddNewInput = () => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[`child-${uuidv4()}`] = dataChildDefault;
    setListChild(_listChild);
  };

  const handleDeleteInput = (key) => {
    let _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild);
  };

  const buildDataPersist = () => {
    let _listChild = _.cloneDeep(listChild);
    let result = [];
    Object.entries(_listChild).map(([key, value], index) => {
      result.push({
        url: value.url,
        description: value.description,
      });
    });
    return result;
  };

  const handleSave = async () => {
    let invalidObj = Object.entries(listChild).find(([key, value], index) => {
      return value && !value.url;
    });

    if (!invalidObj) {
      let data = buildDataPersist();
      let res = await createNewRole(data);
      if (res && res.EC === 0) {
        toast.success(res.EM);
      }
    } else {
      toast.error("Input URL must not be empty...");
      let _listChild = _.cloneDeep(listChild);
      const key = invalidObj[0];
      _listChild[key]["isValid"] = false;
      setListChild(_listChild);
    }
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="mt-3">
          <div className="title-role">
            <h4>Add a new role</h4>
          </div>

          <div className="row-parent">
            {Object.entries(listChild).map(([key, value], index) => {
              return (
                <div className="row role-child" key={`child-${key}`}>
                  <div className={`col-5 form-group`}>
                    <label>URL:</label>
                    <input
                      type="text"
                      value={value.url}
                      className={
                        value.isValid
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      onChange={(e) =>
                        handleOnChangeInput("url", e.target.value, key)
                      }
                    />
                  </div>
                  <div className="col-5 form-group">
                    <label>Description:</label>
                    <input
                      type="text"
                      value={value.description}
                      className="form-control"
                      onChange={(e) =>
                        handleOnChangeInput("description", e.target.value, key)
                      }
                    />
                  </div>
                  <div className="col-2 mt-4 actions">
                    <button
                      className="btn btn-success me-1"
                      onClick={() => handleAddNewInput()}
                    >
                      <i className="fa fa-plus-circle"></i>
                    </button>
                    {index >= 1 && (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteInput(key)}
                      >
                        <i className="fa fa-trash-o"></i>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div>
              <button
                className="btn btn-warning mt-3"
                onClick={() => handleSave()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
