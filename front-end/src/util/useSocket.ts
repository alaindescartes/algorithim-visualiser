import { useEffect, useState } from "react";

const useSocket = (url: string) => {
  const socket = new WebSocket(`ws://127.0.0.1:8000/algo/ws/${url}`);
  const [array, setArray] = useState<number[]>([]);
  useEffect(() => {
    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send("Hello from the browser!");
    };

    socket.onmessage = (event) => {
      try {
        if (event.data.startsWith("{")) {
          const data = JSON.parse(event.data);
          if (data.sorted_array) {
            setArray(data.sorted_array);
          }
        } else {
          console.log("Non-JSON message from server:", event.data);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, []);

  return array;
};
export default useSocket;
