import axios from "axios";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

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

  const defaultMaterialTheme = createTheme();
  return (
    <>
      {" "}
      <div style={{ maxWidth: "100%", paddingTop: "2%" }}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            columns={[
              { title: "id", field: "id" },
              { title: "subject", field: "subject" },
            ]}
            data={data}
            title="Archive Documents"
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default Documents;
