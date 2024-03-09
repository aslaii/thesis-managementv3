// src/utils/realTimeUtils.js
import { database } from "./firebase";
import { ref, set } from "firebase/database";

export const sendDeviceDataToFirebase = async (deviceData) => {
  try {
    const timestamp = Date.now();
    const deviceDataRef = ref(database, "devices/" + timestamp);
    await set(deviceDataRef, deviceData);
    console.log("Data sent successfully");
  } catch (error) {
    console.error("Error sending data to Firebase: ", error);
  }
};
