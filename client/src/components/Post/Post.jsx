import { FaRegCommentAlt } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";


function Post({post}) {
    const {User, header, content, likes, comments} = post;
    
    return (
        <div className="hover:bg-gray-100 rounded-lg px-4 py-2">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-[25px] h-[25px]">
                    <img src={User.profilePic} className="rounded-full" />
                </div>
                <span>{User.username}</span>
            </div>
            <div className="flex-col mb-2">
                <h1 className="flex justify-start text-[20px] font-bold mb-2">{header}</h1>
                <div className="flex justify-start">
                    <p>{content}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center bg-gray-200 rounded-[15px] gap-1 p-2 ">
                    <BiUpvote className="w-[20px] h-[20px] hover:fill-red-800" />
                    {likes}
                    <BiDownvote className="w-[20px] h-[20px] hover:fill-blue-800" />
                </div>
                <div className="flex items-center justify-center w-[50px] gap-2 p-2 rounded-[15px] bg-gray-200">
                    <FaRegCommentAlt />
                    <span>{comments.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Post