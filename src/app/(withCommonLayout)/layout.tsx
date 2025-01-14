import { Navbar } from "@/src/components/UI/navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" flex flex-col h-screen">
      <div></div>
      <div className="w-full mx-auto flex-grow">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default layout;
