import { useMemo, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/Bars/Navbar";
import LeftBar from "./components/Bars/Leftbar";

function ProtectedRoute({userInfo}) {

    const [toggleLeftBar, setToggleLeftBar] = useState(false);
    
    const isLoggedIn = useMemo(() => {
        return (user, accessToken) => {
          return user && accessToken;
        };
      }, []);

    const token = localStorage.getItem("user");  
    const accessToken = JSON.parse(token)?.accessToken;

    return (
        isLoggedIn(userInfo, accessToken) ? (
            <div className="w-full h-screen">
                <Navbar userInfo={userInfo} toggleLeftBar={setToggleLeftBar} />
                <div className="h-full">
                    <LeftBar toggle={toggleLeftBar}/>
                    <div className="lg:w-[calc(100%-256px)] w-full h-full lg:ml-[256px] "> 
                        <Outlet />  
                    </div>
                </div>
            </div>
        ) : 
        <Navigate to={"/signin"} />
    )
}

export default ProtectedRoute