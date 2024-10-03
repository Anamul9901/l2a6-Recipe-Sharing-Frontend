"use client";
import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import Loading from "../UI/loading";
import FXModal from "./FXModal";
import { useCreateOrderMutation } from "@/src/redux/features/order/order";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import { Spinner } from "@nextui-org/spinner";

const CreateOrderModal = ({
  totalPrice,
  totalMonth,
}: {
  totalPrice: number;
  totalMonth: number;
}) => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { data: userData } = useGetMyDataQuery(undefined);
  const user = userData?.data[0];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finalData = {
      user: { name: user?.name, email: user?.email, id: user?._id },
      totalPrice,
    };
    const res = await createOrder(finalData).unwrap();
    if (res.success) {
      window.location.href = res.data.payment_url;
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        title="Update Your Profile"
        buttonText="Buy"
        buttonClassName="flex"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput
              label="Name"
              name="name"
              defaultValue={user?.name}
              isDisabled={true}
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput
              label="Email"
              name="email"
              defaultValue={user?.email}
              isDisabled
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput
              label="Total Amount"
              name="totalPrice"
              defaultValue={totalPrice}
              isDisabled
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput
              label="Total Month"
              name="totalMonth"
              defaultValue={totalMonth}
              isDisabled
            ></FXInput>
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="w-full" type="submit">
              {isLoading ? <Spinner size="sm" /> : "Submit"}
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default CreateOrderModal;
