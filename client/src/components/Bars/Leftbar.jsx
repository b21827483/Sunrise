import axios from "axios";
import { useEffect, useState } from "react"

const DUMMY_SUBS = [
    {
        name: "TheSopranos",
    },
    {   name: "Better Call Saul"
    }
]

function LeftBar({toggle}) {
    const [openSubs, setOpensubs] = useState(false);
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8800/subs").
        then(response => {
                setSubs(response.data);
            }
        ).catch(err => {
            console.log(err.response.data.message);
        });
    }, [])

    return (
        <aside className={`fixed top-[80px] left-0 z-40 w-64 h-screen transition-transform ${toggle ? " ": " -translate-x-full "}bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}>
            <div className="h-full px-3 pb-4 pt-2 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700">
                        <div className="w-full flex-col justify-between items-center">
                            <div className="flex justify-between items-center hover:bg-gray-100 p-3">
                                <span className="flex-1 ms-3 whitespace-nowrap text-start">Joined Subs</span>
                                <button onClick={(e) => {setOpensubs(prevState => {return !prevState})}} className="bg-transparent p-0 m-0">
                                    <svg rpl="" fill="currentColor" height="20" icon-name="caret-down-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
                                    </svg>
                                </button>
                            </div>
                            {openSubs && (
                                <div className="ml-6 block border-l-[1px] border-black">
                                    <ul className="m-0 p-0"> 
                                        {subs.map(sub => {return <li className="flex justify-start items-center pl-2 py-2 hover:bg-gray-100" key={sub.name}>{sub.name}</li>})}
                                    </ul>
                                </div>
                            )}
                        </div>

                    </li>
                    
                </ul>
            </div>
        </aside>
    )
}

export default LeftBar