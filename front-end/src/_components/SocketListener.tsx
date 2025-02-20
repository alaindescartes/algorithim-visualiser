import useSocket from "@/util/useSocket";

function SocketListener({ url }: { url: string }) {
  useSocket(url);
  return null; // This component doesn't render any UI
}

export default SocketListener;
