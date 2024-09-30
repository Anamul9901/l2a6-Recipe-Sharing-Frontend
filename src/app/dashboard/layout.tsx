import Sidebar from "@/src/components/UI/dashboard/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex mx-auto max-w-7xl w-full">
      <Sidebar />
      {children}
    </div>
  );
};

export default layout;
