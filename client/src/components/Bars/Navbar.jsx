import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import LeftBar from "./Leftbar";

function Navbar({userInfo, toggleLeftBar}) {

    const [dropdown, setDropDown] = useState(false);

    function toggleDropDown() {
        setDropDown(prevState => {return !prevState});
    }

    function leftBarHandler() {
        toggleLeftBar(prevState => {return !prevState});
    }

    return (
        <div className="sticky top-0 bg-blue-500 w-full flex justify-between items-center z-50 p-4 min-w-[300px]">
            <span onClick={leftBarHandler} className="absolute lg:hidden hover:bg-gray-200 p-1">
                <svg rpl="" fill="currentColor" height="20" icon-name="menu-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 10.625H1v-1.25h18v1.25Zm0-7.875H1V4h18V2.75ZM19 16H1v1.25h18V16Z"></path>
                </svg>
            </span>
            <div className="flex items-center gap-4 ml-8 lg:ml-0">
                <img src="https://cdn3.emoji.gg/emojis/2784-de-communism.png" className="h-12 w-12" />
                <span className="text-2xl text-white font-bold sm:flex hidden">Sunrise</span>
            </div>
            <div className="md:w-1/3 w-1/2">
                <Search />
            </div>
            <div className="relative">
                <button className="bg-transparent p-0 border-none" onClick={toggleDropDown}>
                    <img src={userInfo.profilePic} className="h-8 w-8 rounded-full" />
                </button>
                {dropdown && (
                    <div className="absolute top-14 right-0 bg-slate-400 rounded p-2 w-48 ">
                        <div className="mb-2">
                            <div>{userInfo.username}</div>
                            <div className="font-bold">{userInfo.email}</div>
                        </div>
                        <hr />
                        <div className="mb-2">
                            <Link to={"/profile"} className="">
                                Profile
                            </Link>
                        </div>
                        <div className="my-2 font-semibold">
                            Settings
                        </div>
                        <hr />
                       <button className="mt-2 p-0 bg-transparent">Logout</button> 
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar