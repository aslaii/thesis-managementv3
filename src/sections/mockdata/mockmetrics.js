import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { database } from "src/utils/firebase";
import { ref, onValue } from "firebase/database";

const MockMetrics = () => {
  const [totalWeights, setTotalWeights] = useState({ Recyclable: 0, Biodegradable: 0 });

  useEffect(() => {
    const devicesRef = ref(database, "devices");

    // Listen for real-time updates from the database
    onValue(devicesRef, (snapshot) => {
      const data = snapshot.val();
      const weights = { Recyclable: 0, Biodegradable: 0 };

      if (data) {
        Object.values(data).forEach((device) => {
          if (device.name === "Recylable") {
            weights.Recyclable += device.weight;
          } else if (device.name === "Biodegradable") {
            weights.Biodegradable += device.weight;
          }
        });
      }

      setTotalWeights(weights);
    });
  }, []);

  return (
    <div>
      <Typography variant="h6">Total Weight of Recyclable: {totalWeights.Recyclable}</Typography>
      <Typography variant="h6">
        Total Weight of Biodegradable: {totalWeights.Biodegradable}
      </Typography>
    </div>
  );
};

export default MockMetrics;
