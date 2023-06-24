import React from "react";
import FunctionsBar from "./FunctionsBar";
import Modal from "./Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Documents from "./Documents";
import Profile from "./Profile";

const Main = ({ SetIsLoggedIn, isLoggedIn, userType, setUserType }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <FunctionsBar setIsLoggedIn={SetIsLoggedIn} isLoggedIn={isLoggedIn} />
      <Fab sx={{ marginTop: 8, marginLeft: "95%" }} onClick={handleClickOpen}>
        <AddIcon color="primary" />
      </Fab>
      <Documents userType={userType} setUserType={setUserType} />
      {open && (
        <Modal
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          open={open}
        />
      )}
    </div>
  );
};

export default Main;
