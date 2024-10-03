"use client";
import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXModal from "./FXModal";
import { SubmitHandler, FieldValues } from "react-hook-form";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/src/redux/features/comment/commentApi";
import Loading from "../UI/loading";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import EditCommentModal from "./EditCommentModal";
import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const CommentModal = ({ id, comments }: { id: string; comments: any }) => {
  const [commentId, setCommentId] = useState("");
  const user = useAppSelector(selectCurrentUser);

  let verifyUser: any;
  if (user?.token) {
    verifyUser = verifyToken(user?.token);
  }
  const [addComment, { isLoading }] = useAddCommentMutation();
  const { data: currentUserData } = useGetMyDataQuery(undefined);
  const currentUser = currentUserData?.data[0];
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finalData = {
      ...data,
      postId: id,
      commentUserId: verifyUser?.userId,
      commentUserImage: currentUser?.profileImg,
      commentUserName: currentUser?.name,
    };
    const res = await addComment(finalData).unwrap();
    if (res?.data) {
      toast.success(res?.messaage);
    }
  };

  const hndleEditComment = (id: string) => {
    setCommentId(id);
  };

  const hndleDeleteComment = async (id: string) => {
    const res = await deleteComment(id).unwrap();
    if (res?.data) {
      toast.success(res?.messaage);
    }
  };
  return (
    <div className="relative  p-6">
      {isLoading && <Loading />}

      <FXModal
        title=""
        buttonText="Comment"
        buttonClassName="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-xl transition-all duration-500 transform hover:scale-105"
      >
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold text-white mb-4">
            All Comments
          </h1>
          <div className="space-y-2">
            {comments?.map((comment: any) => (
              <div className="border border-gray-700 rounded-xl p-2 shadow-lg bg-gray-800 bg-opacity-60 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                <Link href={`/profile/${comment?.commentUserId}`}>
                  <Avatar
                    src={comment?.commentUserImage}
                    className="w-12 h-12 rounded-full border-2 border-teal-400 shadow-lg"
                  />
                </Link>
                <div className="flex flex-col">
                  <Link
                    href={`/profile/${comment?.commentUserId}`}
                    className="text-sm font-bold text-teal-400 hover:text-blue-400 transition-all duration-300"
                  >
                    {comment?.commentUserName}
                  </Link>
                  <p className="text-md text-gray-300 mt-1">
                    {comment?.comment}
                  </p>
                </div>
                {verifyUser && verifyUser?.userId == comment?.commentUserId && (
                  <div className=" flex-1  justify-end text-end">
                    <button onClick={() => hndleEditComment(comment?._id)}>
                      <EditCommentModal id={commentId} />
                    </button>
                    <button
                      onClick={() => hndleDeleteComment(comment?._id)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-700 rounded-full text-md transition duration-300"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <FXForm onSubmit={onSubmit}>
          <div className="py-4">
            <FXInput label="Add Your Comment" name="comment" required />
          </div>
          <div className="flex justify-center pt-4 w-full">
            <Button
              className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-xl transition-all duration-500 transform hover:scale-105"
              type="submit"
            >
              Comment
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default CommentModal;
