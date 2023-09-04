import React, { useState, useEffect } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const Role = (props) => {
  const [listChild, setListChild] = useState({
    child1: { url: "", description: "" },
  });

  useEffect(() => {
    Object.entries(listChild).map(([key, value]) => {});
  }, []);

  const handleOnChangeInput = (name, value, key) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[key][name] = value;
    setListChild(_listChild);
  };

  const handleAddNewInput = () => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };
    setListChild(_listChild);
  };

  const handleDeleteInput = (key) => {
    let _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild);
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
                      className="form-control"
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
              <button className="btn btn-warning mt-3">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
