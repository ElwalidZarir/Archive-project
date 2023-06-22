import { Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Profile = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const data = await axios.get("http://localhost:3001/users");
      console.log("Users data >>>>>", data);
      console.log("Data >>>>>", data.data.data);
      setData(data.data.data);
    };
    fetchUser();
    console.log(data);
  }, []);

  const currentUserName = localStorage.getItem("username");

  useEffect(() => {
    const getCurrentUserInfo = () => {
      const userdata = data.find((item) => item.username == currentUserName);
      setUserData(userdata);
    };
    getCurrentUserInfo();
    console.log(userData);
  }, []);

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box>
        <Typography p={2} width="250px" textAlign="center" role="presentation">
          Your Profile
        </Typography>
      </Box>
      <div className="col-md-8">
        <div className="card-body p-4">
          <h6>Information</h6>
          <hr className="mt-0 mb-4"></hr>
          <div className="row pt-1">
            <div className="col-6 mb-3">
              <h6>Username</h6>
              <p className="text-muted"></p>
            </div>
            <div className="col-6 mb-3">
              <h6>Phone</h6>
              <p className="text-muted">123 456 789</p>
            </div>
          </div>
          <h6>Projects</h6>
          <hr className="mt-0 mb-4"></hr>
          <div className="row pt-1">
            <div className="col-6 mb-3">
              <h6>Recent</h6>
              <p className="text-muted">Lorem ipsum</p>
            </div>
            <div className="col-6 mb-3">
              <h6>Most Viewed</h6>
              <p className="text-muted">Dolor sit amet</p>
            </div>
          </div>
          <div className="d-flex justify-content-start">
            <a href="#!">
              <i className="fab fa-facebook-f fa-lg me-3"></i>
            </a>
            <a href="#!">
              <i className="fab fa-twitter fa-lg me-3"></i>
            </a>
            <a href="#!">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default Profile;
