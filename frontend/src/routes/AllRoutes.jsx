import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Blogs from "../Pages/Blog";
import About from "../Pages/About";
import Navbar from "../components/Navbar";

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
