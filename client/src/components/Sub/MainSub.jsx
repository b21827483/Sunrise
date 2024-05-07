import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getSubPosts } from "../../redux/Slices/PostSlice";

function MainSub() {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const subInfo = useSelector(state => state.sub?.subInfo);
    const posts = useSelector(state => state.post?.posts);

    useEffect(() => {
        async function getPosts() {
            if(subInfo !== null && subInfo !== undefined) {
                if(subInfo._id) {
                    setIsLoading(true)
                    dispatch(getSubPosts(subInfo._id))
                    setIsLoading(false);
                }
            }
        }

        getPosts();
    }, [subInfo, dispatch]);

    return (
        <div className="flex-col justify-center items-center w-full">
            <div className="mb-2">
                <hr className="border-gray-200 border-[1px]" />
            </div>
            <div>
                main
            </div>
        </div>
    )
}

export default MainSub