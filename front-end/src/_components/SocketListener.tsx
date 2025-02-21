import useSocket from "@/util/useSocket";

function SocketListener({ url }: { url: string }) {
  useSocket(url);
  return null;
}

export default SocketListener;
