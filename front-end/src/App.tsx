import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:8000");

const SortingVisualizer = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket: " + socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Connection error:", error.message);
    });

    socket.on("response_event", (data) => {
      console.log("📩 Server Response:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("response_event");
    };
  }, []);

  const sendCustomEvent = () => {
    socket.emit("my_custom_event", { message: "Hello from React!" });
  };

  return (
    <div>
      <h2>Sorting Visualizer</h2>
      <button onClick={sendCustomEvent}>Send Custom Event</button>
    </div>
  );
};

export default SortingVisualizer;
