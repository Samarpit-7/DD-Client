import React from "react";
import { Button, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

function NavBar() {
  // const { logout, auth } = useAuth();

  const adminPaths = [
    { name: "Register", path: "/adduser" },
    { name: "Escrow Master", path: "/escrow-master" },
    { name: "Waterfall Details", path: "/waterfall-details" },
  ];
  const userPaths = [
    { name: "Home", path: "/" },
    { name: "Add Loans", path: "/addloans" },
  ];
  const auth = true;

  const handleLogout = () => {
    // logout();
    console.log("Logged Out");
  };
  return (
    <Navbar expand="lg" className="bg-dark">
      <Nav className="container-fluid px-5">
        {/* <Link to={auth.role == "admin" ? "/users" : "/"}> */}
        <Link>
          <Navbar.Brand>
            <img src="/assets/logo.png" alt="logo" className="w-25 img-fluid" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav
            className="ml-auto justify-content-end"
            style={{ width: "100%" }}
          >
            {auth ? (
              adminPaths.map((path, index) => (
                <div key={index} className="d-flex flex-row align-items-center">
                  <Link to={path.path} className="text-decoration-none">
                    <Navbar.Text className="text-white fs-4 ">
                      {path.name}
                    </Navbar.Text>
                  </Link>
                  <div
                    className="border-end border-secondary border-3 mx-3"
                    style={{ height: "30px" }}
                  />
                </div>
              ))
            ) : (
              <div>
                <h1 className="text-white text-center me-4">
                  Hi,{" "}
                  <span className="text-decoration-underline">
                    {auth.user_name}
                  </span>
                </h1>
              </div>
            )}
            <Button
              variant="outline-danger"
              className="fs-5 btn-sm d-flex align-items-center justify-content-between"
              onClick={handleLogout}
            >
              Logout <MdLogout className="ms-2" />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
