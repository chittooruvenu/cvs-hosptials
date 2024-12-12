import React from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

function AddCustomer(props) {
const navigate = useNavigate();
  const submit = e => {
    let name = e.target[0].value;
    let dob = e.target[1].value;
    let creditlimit = e.target[2].value;
    let data = {
      name,
      dob,
      creditlimit
    };
    postCustomer(data);
  };

  const postCustomer = data => {
    axios
      .post("http://localhost:8080/customer", data)
      .then(d => {
        console.log(d);
        navigate('/medicine-show');
      })
      .catch(err => alert(err));
  };

  return (
    <div className="container my-3">
      <form
        onSubmit={e => {
          e.preventDefault();
          submit(e);
        }}
      >
        <div className="form-group">
          <label>Medicine Name</label>
          <input type="text" className="form-control form-control-sm" />
        </div>
        <div className="form-group">
          <label>Expire Date</label>
          <input type="text" className="form-control form-control-sm" />
        </div>
        <div className="form-group">
          <label>How Many Days</label>
          <input type="text" className="form-control form-control-sm" />
        </div>

        <button type="submit" className="btn btn-primary btn-sm">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
