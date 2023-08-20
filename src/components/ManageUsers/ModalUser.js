import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Users.scss";
import { fetchAllGroup } from "../../services/userService";

const ModalUser = (props) => {
  const [userGroup, setUserGroup] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    getUserGroup();
  }, []);

  const getUserGroup = async () => {
    let res = await fetchAllGroup();
    if (res && res.data && res.data.EC === 0) {
      setUserGroup(res.data.DT);
    }
  };

  return (
    <>
      <Modal size="lg" show>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email (<span className="red">*</span>)
              </label>
              <input className="form-control" type="email" />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone (<span className="red">*</span>)
              </label>
              <input className="form-control" type="text" />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Username</label>
              <input className="form-control" type="text" />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Password (<span className="red">*</span>)
              </label>
              <input className="form-control" type="text" />
            </div>
            <div className="col-12 form-group">
              <label>Address</label>
              <input className="form-control" type="text" />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender</label>
              <select className="form-select">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group (<span className="red">*</span>)
              </label>
              <select className="form-select">
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
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
