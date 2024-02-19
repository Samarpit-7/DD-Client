import React from "react";
import { Container } from "react-bootstrap";
import ImportFiles from "../components/ImportFiles";
import ExportFIles from "../components/ExportFIles";

const HomePage = () => {
  return (
    <Container className="text-center">
      <h1>Data Dictionary</h1>
      <ImportFiles />
      <ExportFIles />
    </Container>
  );
};

export default HomePage;
