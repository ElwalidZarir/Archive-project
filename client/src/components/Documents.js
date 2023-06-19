import axios from "axios";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import download from "downloadjs";

const Documents = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:3001/files");
      console.log("Products >>>>>", data);
      console.log("Data >>>>>", data.data.data);
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
    <>
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
            }}
            columns={[
              { title: "id", field: "_id" },
              { title: "subject", field: "subject" },
              {
                title: "file",
                field: "file_path",
                emptyValue: () => <em>null</em>,
                render: (row) => (
                  <div
                    onClick={() =>
                      downloadFile(row._id, row.file_path, row.file_mimetype)
                    }
                  >
                    {row.file_path.split("uploads/")}
                  </div>
                ),
              },
              { title: "Creation Date", field: "creationDate" },
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
    </>
  );
};

export default Documents;
