import React, { useState } from "react";
import "./Modal.scss";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Modal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState();
  const [subject, setSubject] = useState();
  const [modal, setModal] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject", subject);
    fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "success");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleSubject = (e) => {
    e.preventDefault();
    setSubject(e.target.value);
  };
  const handleFile = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const onclick = () => {
    setModal(!modal);
  };
  const paperStyle = {
    padding: 20,
    height: "45vh",
    width: 350,
    margin: "2% 38% auto",
  };
  const textfieldsStyle = {};
  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle} className="content">
          <form onSubmit={handleUpload}>
            <Grid align="center">
              {" "}
              <h2>Add document</h2>{" "}
            </Grid>
            <Grid style={textfieldsStyle} sx={{ space: 2 }}>
              <TextField
                margin="normal"
                type="subject"
                label="subject"
                name="subject"
                onChange={handleSubject}
                fullWidth
              />
              <TextField
                margin="normal"
                type="subject"
                label="subject"
                name="subject"
                onChange={handleSubject}
                fullWidth
              />
              <Button
                variant="contained"
                component="label"
                sx={{ marginRight: "100%" }}
              >
                Upload
                <input
                  type="file"
                  onChange={handleFile}
                  className="form-control"
                  name="file"
                  align="left"
                  id="text"
                  hidden
                  multiple
                />
              </Button>
              <Button
                margin="normal"
                sx={{
                  marginTop: "25%",
                  padding: 1,
                  backgroundColor: "#07ad90",
                  color: "black",
                }}
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Modal;
