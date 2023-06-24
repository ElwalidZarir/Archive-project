import React, { useEffect, useState } from "react";
import Modal from "./Modal.js";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const FunctionsBar = () => {
  const user = localStorage.getItem("username");
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [search, setSearch] = useState([]);
  const [key, setKey] = useState("");

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = async () => {
    window.localStorage.removeItem("isLoggedIn");
    window.location.reload(false);
  };

  useEffect(() => {
    const search = async () => {
      try {
        if (!key.trim()) {
          setSearch([]);
          return;
        } else {
          const res = await axios.get("http://localhost:3001/users", {
            params: { key, limit: 5 },
          });
          setSearch(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    search();
  }, [key]);

  return (
    <div>
      <Box sx={{ flexGrow: 1, mx: "auto", backgroundColor: "red" }}>
        <AppBar sx={{ backgroundColor: "#07ad90" }}>
          <Toolbar>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => setIsDrawerOpen(true)}>Profile</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: "flex" }}
            >
              Archive
            </Typography>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge color="error">
                  <HomeIcon />
                </Badge>
              </IconButton>{" "}
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </MenuItem>
            {/*  <form>
              <div>
                <InputBase
                  sx={{
                    ml: 1,
                    flex: 1,
                    width: "200px",
                    backgroundColor: "white",
                  }}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Search users"
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </div>
              {search && search.length > 0 && (
                <div>
                  {search.map((user) => (
                    <div key={user.id}>
                      <div></div>
                      <div>
                        <p>{user.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>  */}
            {/* <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={search.map((option) => option.username)}
                renderInput={(params) => (
                  <TextField
                    sx={{}}
                    {...params}
                    variant="filled"
                    placeholder="Search users"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Stack> */}
            <Typography
              sx={{ marginLeft: "15px" }}
              variant="h6"
            >{`   Hi ${user}`}</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Profile setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
    </div>
  );
};

export default FunctionsBar;
