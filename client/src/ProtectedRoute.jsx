import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/Bars/Navbar";

function ProtectedRoute({userInfo}) {
    
    const isLoggedIn = useMemo(() => {
        return (user, accessToken) => {
          return user && accessToken;
        };
      }, []);

    const token = localStorage.getItem("user");  
    const accessToken = JSON.parse(token)?.accessToken;

    return (
        isLoggedIn(userInfo, accessToken) ? (
            <div className="w-screen">
                <Navbar userInfo={userInfo} />
                <div>
                    <Outlet />
                </div>
            </div>
        ) : 
        <Navigate to={"/signin"} />
    )
}

export default ProtectedRoute