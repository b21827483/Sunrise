import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import axios from "axios";

function Search() {

    const [searchInput, setSearchInput] = useState("");
    const [subs, setSubs] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [focus, setFocus] = useState(false);

    const debounceSearch = useCallback(
        debounce((searchInput) => {
            axios.get(`http://localhost:8800/search?q=${searchInput}`).
                then(response => {  
                    const {subs, users} = response.data;
                    setSubs(subs);
                    setUsers(users);
                }).catch(err => {
                    console.log(err.response.data.message);
                })
        }, 500), []
    );

    function resetStates() {
        setSearchInput("");
        setSubs([]);
        setUsers([]);
    }

    function searchInputHandler(e) {
        const value = e.target.value;
        setSearchInput(value)

        if (value === "") {
            resetStates();
        } 
        else {
            setIsLoading(true);
            debounceSearch(value);
        }
    }

    return (
        <div className="w-full relative"
             onBlur={() => {setFocus(prevState => {return !prevState})}}
             onFocus={() => {setFocus(prevState => {return !prevState})}}>
            <input className="rounded w-full py-1 px-3 focus:outline-none"
                   value={searchInput}
                   onChange={searchInputHandler}  
                   autoComplete="off"
                   autoCorrect="false"
                   placeholder="Search..." />
            {searchInput !== "" && (
                <div className={`absolute w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded bg-white ${!focus ? "hidden" : ""}`}>
                    {subs.length > 0 && (
                        <div>
                            <h2 className="font-semibold flex justify-start ml-2">Subs</h2>
                            <ul className="flex justify-start ml-6">
                                {subs.map(sub => {return <li key={sub._id}>{sub.name}</li>})}
                            </ul>
                        </div>
                    )}   
                    {users.length > 0 && (<div className="overflow-auto pt-2">
                            <h2 className="font-semibold flex justify-start ml-2">People</h2>
                            <ul className="flex justify-start">
                                {users.map(user => {return <div key={user._id} className="flex items-center gap-2 hover:bg-gray-200 w-full p-3">
                                        <img src={user.profilePic} className="w-7 h-7 rounded-full" />
                                        <li className="flex">{user.username}</li>
                                    </div>})}
                            </ul>
                        </div>
                        )
                    }
                    {isLoading && <div className="hover:bg-gray-200 py-2">Searh for {searchInput}</div>}    
                </div>
            )}       
                  
        </div>
    )
}

export default Search