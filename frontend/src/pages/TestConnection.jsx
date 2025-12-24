import { useEffect } from "react";
import api from "../api/axios";

function TestConnection() {
  useEffect(() => {
    api
      .get("/videos")
      .then((res) => console.log("Backend response:", res.data))
      .catch((err) => console.error(err));
  }, []);

  return <h2>Check the console for backend response</h2>;
}

export default TestConnection;