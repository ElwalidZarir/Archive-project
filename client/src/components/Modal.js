import React, { useState } from "react";
import "./Modal.scss";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Modal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState();
  const [subject, setSubject] = useState();
  const [creationDate, setCreationDate] = useState(new Date());
  const [modal, setModal] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("file", file);
    formData.append("creationDate", creationDate);
    fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "success");
        console.log(formData.get("date"));
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

  const handleDate = (e) => {
    setCreationDate(e.target.value);
  };

  const paperStyle = {
    padding: 20,
    height: "45vh",
    width: 350,
    position: "fixed",
    margin: "-22% 38% auto",
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
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <input type="date" name="creationDate" onChange={handleDate} />
              </LocalizationProvider>
              <TextField
                margin="normal"
                label="subject"
                name="file"
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
