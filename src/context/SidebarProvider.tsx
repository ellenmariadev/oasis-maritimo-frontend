"use client";
import { ReactNode, useState } from "react";
import { SidebarContext } from "./context";

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState("animals");

  return (
    <SidebarContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </SidebarContext.Provider>
  );
};