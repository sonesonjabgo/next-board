import React from "react";
import { SocketProvider } from "./socketContext";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  return <SocketProvider>{props.children}</SocketProvider>;
}

export default Layout;
