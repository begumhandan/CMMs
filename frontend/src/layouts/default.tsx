import { ReactNode } from "react";
import { Header } from "../components/layout/header";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main>{children}</main>
    </div>
  );
}
