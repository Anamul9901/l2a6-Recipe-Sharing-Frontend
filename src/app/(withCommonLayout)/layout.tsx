import { Navbar } from "@/src/components/UI/navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl md:px-4 px-2 flex-grow">
        {children}
      </main>
    </div>
  );
};

export default layout;
