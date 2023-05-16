import React, { useState } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Modal = ({ open, handleClose }) => {
  const [file, setFile] = useState();
  const [subject, setSubject] = useState();
  const [creationDate, setCreationDate] = useState(new Date());
  const [modal, setModal] = useState(false);

  const handleSubmit = (e) => {
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
    padding: "2%",
    height: "45vh",
    width: 350,
    position: "fixed",
    margin: "5% 38% auto",
  };
  const textfieldsStyle = {};

  return (
    <>
      <div>
        <Button variant="outlined">Open dialog</Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Modal title
          </BootstrapDialogTitle>
          <form onSubmit={handleSubmit}>
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
                <TextField
                  type="date"
                  name="creationDate"
                  onChange={handleDate}
                />
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
                  backgroundColor: "#07ad90",
                  color: "black",
                  position: "relative",
                }}
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </form>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
      {/*<Grid>
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
                <TextField
                  type="date"
                  name="creationDate"
                  onChange={handleDate}
                />
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
                  padding: "1vh",
                  backgroundColor: "#07ad90",
                  color: "black",
                  position: "relative",
                }}
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Paper>
              </Grid>*/}
    </>
  );
};

export default Modal;
