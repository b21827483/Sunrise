import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {signUp, clearMessage} from "../redux/AuthSlice";

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const signUpSuccess = useSelector(state => {return state.auth?.signUpSuccess});
    const signUpError = useSelector((state)=> {return state.auth?.signUpError});
    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function signupSubmitHandler(e) {
        e.preventDefault();
        setLoading(true);
        const userInfo = {username: username, email: email, password: password};
        await dispatch(signUp(userInfo));
        setLoading(false);
    }

    function clearNotificationHandler() {
        dispatch(clearMessage());
    }

    if (signUpSuccess) {
        navigate("/signin")
    }

    return (
        <div>
            <div className="container mx-auto flex min-h-screen w-full justify-center items-center">
                <form onSubmit={signupSubmitHandler} className="flex-col justify-center items-center w-full max-w-md">
                    <span className="font-bold">SUNRISE, PARABELLUM</span>
                    <div className="flex justify-center items-center">
                        <img className="h-15 w-15" src="https://cdn3.emoji.gg/emojis/2784-de-communism.png"/>
                    </div>
                    {loading && <span>Loading...</span>}
                    
                    <div className="flex-col justify-center items-center w-full">
                        <div>   
                            <input className="w-3/5 p-1 my-1 border-2 border-black focus:outline-none" 
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => {setUsername(e.target.value)}}
                            required
                            placeholder="username"/>
                        </div>
                        <div>
                            <input className="w-3/5 p-1 my-1 border-2 border-black focus:outline-none"
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            required
                            placeholder="email"/>
                        </div>
                        <div>
                            <input className="w-3/5 p-1 my-1 border-2 border-black focus:outline-none"
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            required
                            placeholder="password"/>
                        </div>
                    </div>
                    <div className="flex justify-evenly items-center my-2">
                        <Link to={"/signin"} className="text-black border-b-2 border-black hover:text-red-400 hover:border-red-400">Sign In</Link>
                        <button className="p-2 hover:bg-red-600 hover:text-yellow-400 transition-all delay-100 ease-linear">Sign Up</button>
                    </div>
                    {signUpError &&
                        <div>
                            {signUpError.map(err => (
                                <div className="flex overflow-auto justify-between items-center my-3 bg-red-400 text-white">
                                    <span className="mx-2">{err}</span>
                                    <button type="button" onClick={clearNotificationHandler} className="mx-2 bg-transparent text-black p-1">X</button>
                                </div>
                        ))}
                        </div>
                        }
                </form>
            </div>
        </div>
    )

}

export default Signup