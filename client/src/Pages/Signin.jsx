import { useState } from "react"
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";

import { clearMessage, signIn } from "../redux/AuthSlice";

function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const signInError = useSelector(state => state.auth?.signInError);

    const dispatch = useDispatch();

    function clearNotificationHandler() {
        dispatch(clearMessage());
    }

    async function signinSubmitHandler(event) {
        event.preventDefault();
        setIsLoading(true);
        await dispatch(signIn({email: email, password: password}));
        setIsLoading(false);
    }

    return (
        <div>
            <div className="container flex items-center justify-center min-h-screen mx-auto relative">
                {signInError && <div className="absolute flex justify-between items-center m-auto top-32 bg-red-400 rounded">
                        <span className="ml-4">{signInError}</span>
                        <button className="bg-transparent p-4 border-none" onClick={clearNotificationHandler} type="button">X</button>
                    </div>}
                <form onSubmit={signinSubmitHandler} className="w-full max-w-[600px]">
                        <div className="mx-auto flex justify-center" >
                            <img className="w-auto h-full sm:h-full" src='https://pbs.twimg.com/media/FeA_3tgaAAA7_SO.png'/>
                        </div>
                        {isLoading && "Loading..."}
                        <div className="flex-col justify-center items-center">
                            <div className="mb-3">
                                <input id="email"
                                       name="email"
                                       type="email"
                                       placeholder="Email"
                                       value={email} 
                                       onChange={(e) => {setEmail(e.target.value)}}
                                       className="w-4/5 sm:w-2/5 p-2 border-2 border-black"/>
                            </div>
                            <div>
                                <input id="password" 
                                       name="password" 
                                       type="password" 
                                       placeholder="Password"
                                       value={password}
                                       onChange={(e) => {setPassword(e.target.value)}} 
                                       className="w-4/5 sm:w-2/5 p-2 border-2 border-black"/>
                            </div>
                        </div>
                        <div className="flex justify-center gap-8 mt-4 items-center">
                            <Link to={"/signup"} className="p-0 border-b-2 border-black text-black transition hover:text-red-500 hover:border-red-400" >
                                Sign Up
                            </Link>
                            <button className="p-2 hover:bg-red-500 hover:text-yellow-400 transition">
                                Sign In
                            </button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Signin