import React from "react";
import FunctionsBar from "./FunctionsBar";
import Modal from "./Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const Main = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <FunctionsBar />
      <Fab
        sx={{ marginTop: 8, marginLeft: "95%" }}
        onClick={() => setOpenModal(true)}
      >
        <AddIcon color="primary" />
      </Fab>
      {openModal && <Modal />}
    </>
  );
};

export default Main;
