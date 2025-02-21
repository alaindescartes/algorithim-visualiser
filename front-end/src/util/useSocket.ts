import { useEffect, useContext } from "react";
import { ArrayContext } from "@/_components/arrayContextProvider";
import { ControllerContext } from "@/_components/ControllerProvider";

const useSocket = (url: string) => {
  const { setNewArray } = useContext(ArrayContext);
  const { setController } = useContext(ControllerContext);

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/algo/ws/${url}`);

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send("Hello from the browser!");
    };

    socket.onmessage = (event) => {
      try {
        if (event.data.startsWith("{")) {
          const data = JSON.parse(event.data);
          if (data.sorted_array) {
            setNewArray([...data.sorted_array]);
          }

          if (data.status === "done") {
            setController((prev) => ({ ...prev, isSorting: false }));
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

    return () => {
      socket.close();
    };
  }, []);

  return null;
};

export default useSocket;
