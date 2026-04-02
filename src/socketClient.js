import axios from "axios";
import { SOCKET_URL } from "./config";

const socketClient = axios.create({
  baseURL: SOCKET_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default socketClient;
