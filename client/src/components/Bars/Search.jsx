import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import axios from "axios";

function Search() {

    const [searchInput, setSearchInput] = useState("");
    const [subs, setSubs] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const debounceSearch = useCallback(
        debounce((searchInput) => {
            setIsLoading(true);
            axios.get(`http://localhost:8800/search?q=${searchInput}`).
                then(response => {  
                    const {subs, users} = response.data;
                    setSubs(subs);
                    setUsers(users);
                }).catch(err => {
                    console.log(err.response.data.message);
                }).finally(
                    setIsLoading(false)
                )
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
            debounceSearch(value);
        }
    }

    return (
        <div className="w-full relative">
            <input className="rounded w-full py-1 px-3 focus:outline-none"
                   value={searchInput}
                   onChange={searchInputHandler}  
                   autoComplete="off"
                   placeholder="Search..." />
            {searchInput !== "" && (
                <div className="absolute w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded bg-white">
                    <div className="">HEY</div>
                    {isLoading && `Searh for ${searchInput}`}       
                    {users.length > 0 && (<div>
                            <h2 className="font-semibold">People</h2>
                            <ul>
                                {users.map(user => {return <li key={user._id}>{user.username}</li>})}
                            </ul>
                        </div>
                        )
                    } 
                </div>
            )}       
                  
        </div>
    )
}

export default Search