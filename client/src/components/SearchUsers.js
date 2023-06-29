import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import download from "downloadjs";
import Profile from "./Profile";
import Chip from "@mui/material/Chip";

const SearchUsers = () => {
  const [data, setData] = useState([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:3001/users");
      console.log("Products >>>>>", data);
      console.log("Data >>>>>", data.data.data);
      setData(data.data.data);
    };

    fetchData();
  }, []);
  const defaultMaterialTheme = createTheme();

  return (
    <div>
      {" "}
      <div style={{ paddingTop: "2%" }}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            options={{
              actionsColumnIndex: -1,
              exportButton: true,
              headerStyle: {
                backgroundColor: "#BEEAC1",
                textAlign: "center",

                color: "black",
              },
              filtering: true,
              pageSizeOptions: [6, 12, 20, 50], // rows selection options
              pageSize: 50,
            }}
            columns={[
              {
                title: "id",
                field: "tableData.id",
              },
              {
                title: "username",
                field: "username",
                render: (row) => (
                  <Chip
                    label={
                      row.username === localStorage.getItem("username")
                        ? "me"
                        : row.username
                    }
                  />
                ),
                cellStyle: {
                  textAlign: "center",
                },
              },
              {
                title: "email",
                field: "email",
                cellStyle: {
                  textAlign: "center",
                },
              },
              {
                title: "userType",
                field: "userType",
                cellStyle: {
                  textAlign: "center",
                },
              },
              {
                title: "role",
                field: "role",
                cellStyle: {
                  textAlign: "center",
                },
              },
            ]}
            /*   editable={{
              onRowDelete: (selectedRow) =>
                new Promise((resolve, reject) => {
                  const index = selectedRow.tableData.id;
                  const updateRows = [...data];
                  updateRows.splice(index, 1);
                  setTimeout(() => {
                    setData(updateRows);
                    console.log(updateRows);
                    resolve();
                    deleteDocument(selectedRow._id);
                  }, 2000);
                }),
            }} */
            data={data}
            title="Archive Documents"
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default SearchUsers;
