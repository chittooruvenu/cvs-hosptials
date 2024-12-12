import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css";
import Parent from './Parent';
import { Link } from "react-router-dom";


const EditUser = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const getUserApi = "http://localhost:8080/getUser";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(getUserApi.concat("/") + id)
      .then((item) => {
        setUser(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user mt-5">
    <Parent data={user} />
      <table className="table table-bordered">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
       
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Name</td>
        <td>{user.fname}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{user.email}</td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>{user.phone}</td>
        
      </tr>
  <tr><td>
  <Link to={`/add/`}> Add Medicines
                     
                    </Link>
  </td>
  <td>
  <Link to={`/medicine-show/`}> Show Medicines
                     
                    </Link>
  </td>
  <td></td></tr>
    </tbody>
  </table>
    </div>
  );
};
export default EditUser;
