import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ImportFiles = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const showAlert = (variant, message) => {
    setAlertMessage({ variant, message });
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: function (header) {
          return header.replace(/\s+/g, "");
        },
        complete: (result) => {
          const formattedData = result.data.map((row) => {
            row.UId = 1;
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
        },
        // },
      });
    });
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
