import Sidebar from "@/src/components/UI/dashboard/Sidebar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-default-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md h-screen sticky top-0">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-grow bg-default-50 p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
