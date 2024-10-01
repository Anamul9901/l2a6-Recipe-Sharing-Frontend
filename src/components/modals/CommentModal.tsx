import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXModal from "./FXModal";
import { SubmitHandler, FieldValues } from "react-hook-form";
import {
  useAddCommentMutation,
  useGetAllCommentQuery,
} from "@/src/redux/features/comment/commentApi";
import Loading from "../UI/loading";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
//{ id }: { id: string }
const CommentModal = ({ id, comments }: { id: string; comments: any }) => {
  console.log("comments-", comments);
  const user = useAppSelector(selectCurrentUser);

  let verifyUser: any;
  if (user?.token) {
    verifyUser = verifyToken(user?.token);
  }
  const [addComment, { isLoading }] = useAddCommentMutation();
  const { data: currentUserData } = useGetMyDataQuery(undefined);
  const currentUser = currentUserData?.data[0];
  console.log(currentUser);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finalData = {
      ...data,
      postId: id,
      commentUserId: verifyUser?.userId,
      commentUserImage: currentUser?.profileImg,
      commentUserName: currentUser?.name,
    };
    const res = await addComment(finalData).unwrap();
    console.log("coment-", res);
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
        <h1 className="text-3xl font-extrabold text-white mb-4">All Comments</h1>
        <div className="space-y-6">
          {comments?.map((comment: any) => (
            <div className="border border-gray-700 rounded-xl p-4 shadow-lg bg-gray-800 bg-opacity-60 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
              <Link href={`/profile/${comment?.commentUserId}`}>
                <Avatar
                  src={comment?.commentUserImage}
                  className="w-12 h-12 rounded-full border-2 border-teal-400 shadow-lg"
                />
              </Link>
              <div className="flex flex-col">
                <Link
                  href={`/profile/${comment?.commentUserId}`}
                  className="text-lg font-bold text-teal-400 hover:text-blue-400 transition-all duration-300"
                >
                  {comment?.commentUserName}
                </Link>
                <p className="text-sm text-gray-300 mt-1">Comment: {comment?.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      <FXForm onSubmit={onSubmit}>
        <div className="py-4">
          <FXInput
            label="Add Your Comment"
            name="comment"
            required
          />
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
