import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

function Navbar({userInfo}) {

    const [dropdown, setDropDown] = useState(false);

    function toggleDropDown() {
        setDropDown(prevState => {return !prevState});
    }

    return (
        <div className="sticky bg-blue-500 w-full mb-5 flex justify-between items-center z-100 p-4">
            <div className="flex items-center gap-4">
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