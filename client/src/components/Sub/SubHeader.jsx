import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getSubInfo } from "../../redux/Slices/SubSlice";


function SubHeader() {
    const dispatch = useDispatch();

    const {subName} = useParams();

    const subInfo = useSelector(state => state.sub?.subInfo);

    useEffect(() => {
        dispatch(getSubInfo(subName));
    }, [dispatch, subName]);

    const {name, subPic, banner, joinedUsers, moderators, posts} = useMemo(() => {
        subInfo || {name:null, subPic:null, banner:null, joinedUsers:[], moderators:[], posts:[]}, [subInfo]
    })

    return (
        <div className="w-full h-full relative rounded-[10px] md:p-4">
            <div className=" bg-blue-300 w-full md:rounded-[5px] md:h-[100px] h-[50px] mb-2 md:mb-0">
                <img src={banner} />
            </div>
            <div className="block md:flex md:relative items-center sm:items-end justify-between -top-[2.25rem] -mb-[2.25rem] sm:mt-0 mx-4 mt-2">
                <div className="flex items-center md:items-end gap-4 justify-start md:mb-0 mb-2">
                    <img className="rounded-full h-[50px] w-[50px] md:h-[80px] md:w-[80px] border-[1px] border-black" src={subPic}/>
                    <span className="font-bold text-3xl">{name}</span>
                </div>
                <div className="flex gap-2 mr-1">
                    <span className="flex items-end">
                        <button className="flex items-center m-0 p-1 border-[2px] border-gray-300 hover:border-black">
                            <span className="mr-2">
                                <svg rpl="" fill="currentColor" height="20" icon-name="add-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path>
                                </svg>
                            </span>
                            <span className="text-center">Create Post</span>
                        </button>
                    </span>
                    <span className="flex justify-center items-center">
                        <button className="m-0 p-1 bg-blue-900 rounded-3xl hover:bg-blue-950">
                            <span className="text-center text-white">Join</span>
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SubHeader;