import axios from "axios";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import download from "downloadjs";
import Profile from "./Profile";
import Chip from "@mui/material/Chip";

const Documents = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:3001/files");
      setData(data.data.data);
    };

    fetchData();
  }, []);

  const deleteDocument = async (id) => {
    axios.delete(`http://localhost:3001/files/${id}`);
  };

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:3001/download/${id}`, {
        responseType: "blob",
      });
      const split = path.split("/");
      const filename = split[split.length - 1];
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error while downloading file. Try again later");
      }
    }
  };

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
              pageSizeOptions: [6, 12, 20, 50], // rows selection options
              pageSize: 50,
              actionsColumnIndex: -1,
              exportButton: true,
              headerStyle: {
                backgroundColor: "#BEEAC1",
                textAlign: "center",
                color: "black",
              },
              filtering: true,
            }}
            columns={[
              {
                title: "Id",
                field: "tableData.id",
              },
              {
                title: "Subject",
                field: "subject",
                cellStyle: {
                  textAlign: "center",
                },
              },
              {
                title: "File",
                field: "file_path",
                emptyValue: () => <em>null</em>,
                render: (row) => (
                  <Chip
                    onClick={() =>
                      downloadFile(row._id, row.file_path, row.file_mimetype)
                    }
                    label={row.file_path.split("uploads/")}
                  />
                ),
                cellStyle: {
                  textAlign: "center",
                },
              },
              {
                title: "Formalized at",
                field: "creationDate",
                render: (row) => <div>{row.creationDate.split("T")[0]}</div>,
                cellStyle: {
                  textAlign: "center",
                },
              },
              {
                title: "Added at",
                field: "createdAt",
                render: (row) => <div>{row.createdAt.split("T")[0]}</div>,
                cellStyle: {
                  textAlign: "center",
                },
              },
              {
                title: "Last update at",
                field: "lastModifiedDate",
                render: (row) => (
                  <div>{row.lastModifiedDate?.split("T")[0]}</div>
                ),
                cellStyle: {
                  textAlign: "center",
                },
              },
              {
                title: "File size in kB",
                field: "size",
                render: (row) => <div>{Math.trunc(row.size / 1000)}</div>,
                cellStyle: {
                  textAlign: "center",
                },
              },
              {
                title: "Added by",
                field: "uploader",
                render: (row) => (
                  <Chip
                    label={
                      row.uploader === localStorage.getItem("username")
                        ? "me"
                        : row.uploader
                    }
                  />
                ),
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

export default Documents;
