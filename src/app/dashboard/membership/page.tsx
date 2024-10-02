"use client";

import CreateOrderModal from "@/src/components/modals/CreateOrderModal";

const Membsership = () => {
    const price = 300
    const totalMonth = 1;
  return (
    <div>
      <h1>This is memb</h1>
      <CreateOrderModal totalPrice={price} totalMonth={totalMonth} />
    </div>
  );
};

export default Membsership;
