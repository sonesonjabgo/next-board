import React from "react";
import { SocketProvider } from "./socketContext";

function page() {
  return (
    <SocketProvider>
      <div>asd</div>
    </SocketProvider>
  );
}

export default page;
