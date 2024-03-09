import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { database } from "src/utils/firebase";
import { ref, onValue } from "firebase/database";

const MockTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const devicesRef = ref(database, "devices");

    // Listen for real-time updates from the database
    const unsubscribe = onValue(devicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRows(formattedData);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Define the columns for the DataGrid
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "weight", headerName: "Weight", width: 150 },
    { field: "timestamp", headerName: "Timestamp", width: 200 },
    // Add other fields as needed
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default MockTable;
