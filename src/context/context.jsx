import { createContext, useState } from "react";
import { Cookies } from "react-cookie";
export let contextData = createContext({}) ; 
export default function Context({children}) {
    let cookie = new Cookies() ; 
    let [value , setValue] = useState(cookie.get("catsATasks")) ; 
    return <contextData.Provider value={{value , setValue}}>{children}</contextData.Provider>
}