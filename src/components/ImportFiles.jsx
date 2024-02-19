import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import * as XLSX from "xlsx";

const ImportFiles = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const showAlert = (variant, message) => {
    setAlertMessage({ variant, message });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const extension = file.name.split(".").pop().toLowerCase();
      if (extension === "csv") {
        // If the file is already CSV, directly parse it with Papa Parse
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          transformHeader: function (header) {
            return header.replace(/\s+/g, "");
          },
          complete: handleParsedData,
        });
      } else if (extension === "xlsx") {
        // If the file is XLSX, converting it to CSV using xlsx and then parse with Papa Parse
        const arrayBuffer = await file.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const csv = XLSX.utils.sheet_to_csv(
          workbook.Sheets[workbook.SheetNames[0]]
        );

        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          transformHeader: function (header) {
            return header.replace(/\s+/g, "");
          },
          complete: handleParsedData,
        });
      } else {
        // Unsupported file type
        alert("Unsupported file type. Please upload CSV or XLSX files.");
      }
    }, []);
    /////////////////////////////////////////////

    const handleParsedData = (result) => {
      const formattedData = result.data.map((row) => {
        if (row.PossibleValues && row.PossibleValues.trim() !== "") {
          row.PossibleValues = row.PossibleValues.split(",");
        } else {
          row.PossibleValues = null;
        }

        if (row.Synonyms && row.Synonyms.trim() !== "") {
          row.Synonyms = row.Synonyms.split(",");
        } else {
          row.Synonyms = null;
        }
        return row;
      });

      axios
        .post("http://localhost:5000/api/dictionary/Bulk", formattedData)
        .then((response) => {
          showAlert("success", "CSV Data Added Successfully!");
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 400) {
            alert(
              "Your Data is not Saved. \nThere are errors in the data.\n Please review and correct them."
            );
          }

          showAlert("danger", "Error adding CSV data.");
        });
    };
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Button {...getRootProps()}>
      <input {...getInputProps()} />
      Import
    </Button>
  );
};

export default ImportFiles;
