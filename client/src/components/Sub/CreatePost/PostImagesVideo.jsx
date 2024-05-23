import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { IoMdCloseCircle } from "react-icons/io";

function PostImagesVideo() {
    const [postImages, setPostImages] = useState([]);

    const uploadImageHandler = (e) => {
        const file = e.target.files[0];
        if(file === null || file === undefined) {
            return
        }
        setPostImages([...postImages, file]);
    }

    const removePostImageHandler = (e) => {
        const node = e.target;
        const imgElement = node.closest("svg").previousElementSibling;
        console.log(imgElement)
        //NEEDS FIXING LATER ON
        const index = parseInt(imgElement.id.charAt(imgElement.id.length - 1));
        let newPostImages = [...postImages];
        if (postImages.length === 1) {
            newPostImages.pop();
            setPostImages(newPostImages);
            return
        }
        console.log(newPostImages)
        newPostImages.splice(index, 1);
        console.log(newPostImages)

        setPostImages(newPostImages);
    }

    return (
        <div>
            {postImages.length === 0 ? (
                <div className="flex items-center justify-center w-full h-[300px] gap-4 border-gray-100 border-[2px] rounded-lg">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        </div>
                        <input id="dropzone-file"
                               type="file" 
                               class="hidden" 
                               onChange={uploadImageHandler}    
                               accept="image/png,image/gif,image/jpeg,image/webp,video/mp4,video/quicktime" />
                    </label>
                </div>) : (
                    <div className="inline-block max-w-[832px] h-full whitespace-nowrap overflow-auto p-4">
                        {postImages.map((image, index) => <div className="inline-block relative min-h-[120px] min-w-[120px] mr-4 mb-4">
                                                    <img id={`postimg-${index}`} className="rounded-md h-[120px] w-[120px] object-cover" src={URL.createObjectURL(image)}/>
                                                    <IoMdCloseCircle onClick={removePostImageHandler} className="absolute top-2 right-2 w-[25px] h-[25px] cursor-pointer fill-white" />
                                                </div>)}
                        <div className="inline-block relative min-w-[120px] min-h-[120px] border-gray-100 border-[2px] rounded-lg mb-4">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="absolute top-8">
                                    <TiPlus className="w-[50px] h-[50px]" />
                                </div>
                                <input id="dropzone-file"
                                    type="file" 
                                    accept="image/png,image/gif,image/jpeg,image/webp,video/mp4,video/quicktime"
                                    className="hidden"
                                    onChange={uploadImageHandler} />
                            </label>
                        </div>
                    </div>)}
        </div>
    )
}

export default PostImagesVideo