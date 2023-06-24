import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
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
import DateFnsUtils from "@date-io/date-fns";
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
  const currentUserName = localStorage.getItem("username");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("lastModifiedDate", file.lastModifiedDate);
    formData.append("file", file);
    formData.append("creationDate", creationDate);
    formData.append("uploader", currentUserName);
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

  console.log(creationDate);

  const paperStyle = {
    padding: "2%",
    height: "45vh",
    width: 350,
    position: "fixed",
    margin: "5% 38% auto",
  };
  const textfieldsStyle = {};

  return (
    <div>
      <Grid sx={{ width: "100%" }}>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Create archive file
          </BootstrapDialogTitle>
          <form onSubmit={handleSubmit}>
            <Grid
              style={textfieldsStyle}
              sx={{
                width: "100%",
                overflow: "hidden",
                space: 2,
                padding: "5%",
              }}
            >
              <TextField
                margin="normal"
                type="subject"
                label="subject"
                name="subject"
                onChange={handleSubject}
                fullWidth
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  variant="inline"
                  name="creationDate"
                  onChange={(newValue) => setCreationDate(newValue)}
                  label="Formalized at"
                  inputVariant="outlined"
                  fullWidth
                />
              </LocalizationProvider>
              <Grid>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ width: "50%", marginRight: "100%", marginTop: "2%" }}
                >
                  Upload a file
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
              </Grid>
            </Grid>{" "}
            <DialogActions>
              {" "}
              <Button
                margin="normal"
                sx={{
                  backgroundColor: "#07ad90",
                  color: "black",
                }}
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </BootstrapDialog>
      </Grid>
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
    </div>
  );
};

export default Modal;
