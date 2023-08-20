import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import "./Users.scss";
import { createNewUser, fetchAllGroup } from "../../services/userService";
import { toast } from "react-toastify";

const ModalUser = (props) => {
  const [userGroup, setUserGroup] = useState([]);

  const defaultUserData = {
    email: "",
    phone: "",
    userName: "",
    password: "",
    address: "",
    gender: "",
    group: "",
  };

  const defaultValidInput = {
    email: true,
    phone: true,
    userName: true,
    password: true,
    address: true,
    gender: true,
    group: true,
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [validInput, setValidInput] = useState(defaultValidInput);

  useEffect(() => {
    getUserGroup();
  }, []);

  const getUserGroup = async () => {
    let res = await fetchAllGroup();
    if (res && res.data && res.data.EC === 0) {
      setUserGroup(res.data.DT);
      if (res.data.DT && res.data.DT.length > 0) {
        let groups = res.data.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    }
  };

  const handleOnChange = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
    console.log(userData);
  };

  const checkValidateInput = () => {
    setValidInput(defaultValidInput);
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInput = _.cloneDeep(defaultValidInput);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirm = async () => {
    let check = checkValidateInput();
    if (check) {
      let res = await createNewUser({
        ...userData,
        groupId: userData["group"],
      });
      if (res && res.data && res.data.EC === 0) {
        toast.success(res.data.EM);
        props.onHide();
        setUserData({ ...defaultUserData, group: userGroup[0].id });
      } else {
        toast.error(res.data.EM);
      }
    }
  };

  return (
    <>
      <Modal size="lg" show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email (<span className="red">*</span>)
              </label>
              <input
                className={
                  validInput.email ? "form-control" : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(e) => handleOnChange(e.target.value, "email")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone (<span className="red">*</span>)
              </label>
              <input
                className={
                  validInput.phone ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={userData.phone}
                onChange={(e) => handleOnChange(e.target.value, "phone")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                value={userData.userName}
                onChange={(e) => handleOnChange(e.target.value, "userName")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password (<span className="red">*</span>)
              </label>
              <input
                className={
                  validInput.password
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="password"
                value={userData.password}
                onChange={(e) => handleOnChange(e.target.value, "password")}
              />
            </div>
            <div className="col-12 form-group">
              <label>Address</label>
              <input
                className="form-control"
                type="text"
                value={userData.address}
                onChange={(e) => handleOnChange(e.target.value, "address")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender</label>
              <select
                className="form-select"
                onChange={(e) => handleOnChange(e.target.value, "gender")}
              >
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group (<span className="red">*</span>)
              </label>
              <select
                className={
                  validInput.phone ? "form-select" : "form-select is-invalid"
                }
                onChange={(e) => handleOnChange(e.target.value, "group")}
              >
                {userGroup.length > 0 &&
                  userGroup.map((item, index) => (
                    <option key={`${item.name}-${index}`} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirm()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
