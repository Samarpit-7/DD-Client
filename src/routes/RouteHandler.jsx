import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../screens/HomePage";
import Login from "../screens/Login";
import Navbar from "../components/Navbar";
import AdminApproval from "../screens/AdminApproval";
import PendingRequest from "../screens/PendingRequest";
import AddUser from "../screens/AddUser";

const RouteHandler = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/approvals" element={<AdminApproval />} />
        <Route path="/requests" element={<PendingRequest />} />
        <Route path="/addUser" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteHandler;
