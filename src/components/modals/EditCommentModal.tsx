"use client";
import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetSingleCommentQuery,
  useUpdateCommentMutation,
} from "@/src/redux/features/comment/commentApi";
import { useEffect, useState } from "react";

const EditCommentModal = ({ id }: { id: string }) => {
  const { data: getSingleComment } = useGetSingleCommentQuery(id);
  const currentComment = getSingleComment?.data?.comment;
  const [updateComment] = useUpdateCommentMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finlData = { id, data: { ...data } };
    const res = await updateComment(finlData);
  };
  return (
    <div>
      {/* {isLoading && <Loading />} */}
      <FXModal
        title="Update Your Profile"
        buttonText="edit"
        buttonClassName="px-2 py-1 bg-green-500 hover:bg-green-700 rounded-full text-md transition duration-300 mr-2"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput
              label="Comment"
              name="comment"
              defaultValue={currentComment}
              required
            ></FXInput>
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="" type="submit">
              Submit
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default EditCommentModal;
