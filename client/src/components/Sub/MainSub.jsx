import { useState, useEffect, useMemo } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getSubPosts } from "../../redux/Slices/PostSlice";
import Post from "../Post/Post";

function MainSub() {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const subInfo = useSelector(state => state.sub?.subInfo);
    const posts = useSelector(state => state.post?.posts);

    useEffect(() => {
        async function getPosts() {
            if(subInfo !== null && subInfo !== undefined) {
                if(subInfo._id) {
                    setIsLoading(true);
                    dispatch(getSubPosts(subInfo._id));
                    setIsLoading(false);
                }
            }
        }

        getPosts();
    }, [subInfo, dispatch]);

    const fetchedPosts = useMemo(() => {
        return posts?.map(post => <div key={post._id}><Post post={post}/><hr /></div>)
    }, [posts])

    return (
        <div className="flex-col justify-center items-center w-full">
            <div className="mb-2">
                <hr className="border-gray-200 border-[1px]" />
            </div>
            <div>
                 {fetchedPosts}
            </div>
        </div>
    )
}

export default MainSub