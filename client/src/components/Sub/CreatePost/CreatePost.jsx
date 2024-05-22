import { MdPostAdd } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { useLayoutEffect, useRef, useState } from "react";
import PostImagesVideo from "./PostImagesVideo";

function CreatePost() {
    const [postHeader, setPostHeader] = useState("");
    const [postContent, setPostContent] = useState("");
    const [options, setOptions] = useState("Post");

    const headerRef = useRef(null);
    const contentRef = useRef(null);

    const useAutoSizeTextArea = (id, textAreaRef, value, height = 0) => {
        useLayoutEffect(() => {
        const textArea = textAreaRef ?? document.getElementById(id);
        if (textArea) {
            textArea.style.height = height + "px";
            const scrollHeight = textArea.scrollHeight;
            textArea.style.height = scrollHeight + "px";
            }
        }, [textAreaRef, id, value])
    };

    useAutoSizeTextArea("post-header", headerRef.current, postHeader);
    useAutoSizeTextArea("post-content", contentRef.current, postContent, 200);

    return (
        <div className="flex-col w-full gap-4">
            <span className="flex justify-start text-[20px] mb-4">Create a Post</span>
            <hr className="mb-4" />
            <div className="w-full rounded-lg bg-white overflow-hidden border-[1px] border-gray-200 ">
                <div className="flex items-center mb-4">
                    <button onClick={() => setOptions("Post")} className={`flex justify-center items-center w-full h-[50px] p-0 rounded-none bg-white border-r-[2px] border-r-gray-100 border-b-[2px] border-b-gray-100 hover:bg-blue-100 ${options === "Post" ? "border-b-blue-600 bg-blue-100 text-blue-600" : ""}`}>
                        <div className="flex items-center gap-2 ">
                            <MdPostAdd />
                            <span>Post</span>
                        </div>
                        <div></div>
                    </button>
                    <button onClick={() => setOptions("Images&Video")} className={`flex justify-center items-center w-full h-[50px] p-0 rounded-none bg-white border-b-[2px] border-b-gray-100 hover:bg-blue-100 ${options === "Images&Video" ? "border-b-blue-600 bg-blue-100 text text-blue-600" : ""}`}>
                        <div className="flex items-center">
                            <CiImageOn />
                            <span>Images & Video</span>
                        </div>
                    </button>
                </div>
                <div className="mb-2 px-4">
                    <textarea id="post-header" 
                              onChange={(e) => {const val = e.target.value; setPostHeader(val)}} 
                              ref={headerRef}
                              rows={1} 
                              value={postHeader} 
                              maxLength={300}
                              className="w-full h-[40px] border-gray-100 border-[2px] no-scrollbar resize-none px-4 py-2" placeholder="Header"></textarea>
                    {options === "Post" ? <textarea id="post-content"
                                                onChange={(e) => {const val = e.target.value; setPostContent(val)}}
                                                ref={contentRef}
                                                rows={20}
                                                value={postContent} 
                                                className="w-full h-[200px] border-gray-100 border-[2px] px-4 py-2"
                                                placeholder="Text (Optional)">
                                           </textarea> : <PostImagesVideo />}
                </div>
                <div className="flex justify-end px-4 mb-2">
                    <button className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white">Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost