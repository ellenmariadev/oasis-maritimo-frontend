import { createContext } from "react";

interface ContextType {
  currentPage: string;
  setCurrentPage: (value: string) => void;
}

export const SidebarContext = createContext<ContextType>({
  currentPage: "",
  setCurrentPage: () => {},
});
