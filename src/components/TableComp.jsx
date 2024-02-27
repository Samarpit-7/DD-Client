import React, { useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";

const TableComp = ({ data, columnMapping }) => {
  if (!data || data.length === 0) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const columns = Object.keys(columnMapping);
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRowExpansion = (rowIndex) => {
    if (expandedRows.includes(rowIndex)) {
      setExpandedRows(expandedRows.filter((row) => row !== rowIndex));
    } else {
      setExpandedRows([...expandedRows, rowIndex]);
    }
  };

  const renderCellContent = (row, columnKey, rowIndex) => {
    if (Array.isArray(row[columnKey])) {
      if (row[columnKey].length > 1) {
        // Assuming the limit of displaying possible values is 5
        return (
          <div>
            {expandedRows.includes(rowIndex)
              ? row[columnKey].join(",")
              : row[columnKey].slice(0, 1).join(",")}
            <br />
            {expandedRows.includes(rowIndex) ? (
              <Button
                variant="link"
                size="sm"
                onClick={() => toggleRowExpansion(rowIndex)}
              >
                Read less
              </Button>
            ) : (
              <Button
                variant="link"
                size="sm"
                onClick={() => toggleRowExpansion(rowIndex)}
              >
                Read more
              </Button>
            )}
          </div>
        );
      } else {
        return row[columnKey].join(", ");
      }
    } else if (
      columnKey === "definition" ||
      columnKey === "fieldType" ||
      columnKey === "container" ||
      columnKey === "dataPoint" ||
      columnKey === "dbColumnName" ||
      columnKey === "dbDataType" ||
      columnKey === "calculatedInfo"
    ) {
      if (row[columnKey].length > 25) {
        return (
          <div>
            {expandedRows.includes(rowIndex)
              ? row[columnKey]
              : `${row[columnKey].substring(0, 25)}...`}
            <br />
            {expandedRows.includes(rowIndex) ? (
              <Button
                variant="link"
                size="sm"
                onClick={() => toggleRowExpansion(rowIndex)}
              >
                Read less
              </Button>
            ) : (
              <Button
                variant="link"
                size="sm"
                onClick={() => toggleRowExpansion(rowIndex)}
              >
                Read more
              </Button>
            )}
          </div>
        );
      } else {
        return row[columnKey];
      }
    } else {
      return row[columnKey];
    }
  };

  return (
    <Table striped responsive bordered className="overflow-scroll ">
      <thead className="table-dark">
        <tr>
          {columns.map((columnKey, index) => (
            <th key={index}>{columnMapping[columnKey]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((columnKey, colIndex) => (
              <td key={colIndex}>
                {renderCellContent(row, columnKey, rowIndex)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComp;
