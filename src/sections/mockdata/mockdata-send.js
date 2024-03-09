import { useCallback, useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";

import { database } from "src/utils/firebase";
import { ref, push } from "firebase/database";

export const SendMockData = (props) => {
  const deviceData = {
    Name: props.name,
    Weight: props.weight,
  };

  //Realtime Updating Timestamp
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  //end of Realtime Updating Timestamp
  //
  const handleSendData = async () => {
    try {
      // Create a new reference for a device entry
      const devicesRef = ref(database, "devices");

      // Push the new device data to the Realtime Database
      await push(devicesRef, {
        name: deviceData.Name,
        weight: deviceData.Weight,
        // hardwareId: "ABC",
        // locationId: "BIO123",
        timestamp: currentTime.toISOString(), // Store as ISO string
      });

      console.log("Data sent to Realtime Database");
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  };

  return (
    <form>
      <CardContent>
        <Stack spacing={1} sx={{ maxWidth: 550 }}>
          <Card>
            <CardHeader title={deviceData.Name} />
            <Divider />
            <Box
              sx={{
                paddingLeft: 2,
                margin: 2,
                padding: 1,
                width: 250,
                marginBottom: 0,
              }}
            >
              <Typography>Hardware ID: ABC</Typography>
              <Typography>Location ID: BIO123</Typography>
              <Typography>Weight: {deviceData.Weight}</Typography>
              <Typography>Date: {currentTime.toLocaleString()}</Typography>
            </Box>
            <CardActions sx={{ justifyContent: "center", marginBottom: 2 }}>
              <Button variant="contained" onClick={handleSendData}>
                Send
              </Button>
            </CardActions>
          </Card>
        </Stack>
      </CardContent>
      <Divider />
    </form>
  );
};
