import "./App.css";
import CreateUser from "./components/User/CreateUser";
import ShowUser from "./components/User/ShowUser";
import { Route, Routes } from "react-router-dom";
import EditUser from "./components/User/EditUser";
import User from "./components/User/User";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Home from "./components/Layout/Home";
/* npm install react-bootstrap bootstrap axios*/


/*
https://medium.com/@bhairabpatra.iitd/crud-create-read-update-delete-application-in-react-566bf229aaee
*/
function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
          
            <Route path="/" element={<Home />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/show-user" element={<ShowUser />} />
              
           
          </Routes>
          <Footer />
        </div>
      </header>
      
    </div>
  );
}

export default App;