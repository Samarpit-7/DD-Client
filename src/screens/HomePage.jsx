import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImportFiles from "../components/ImportFiles";
import ExportFIles from "../components/ExportFIles";
import TableComp from "../components/TableComp";
import axios from "axios";

const HomePage = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dictionary")
      .then(function (response) {
        setApiData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columnMapping = {
    container: "Container",
    dataPoint: "Data Point",
    dbColumnName: "DB Column Name",
    fieldType: "Field Type",
    dbDataType: "DB Data Type",
    definition: "Definition",
    possibleValues: "Possible Values",
    synonyms: "Synonyms",
    // calculatedInfo: "Calculated Info",
  };
  return (
    <Container fluid className="text-center p-3 w-100">
      <h1>Data Dictionary</h1>
      {/* <ImportFiles />
      <ExportFIles /> */}
      <div>
        <TableComp data={apiData} columnMapping={columnMapping} />
      </div>
    </Container>
  );
};

export default HomePage;
