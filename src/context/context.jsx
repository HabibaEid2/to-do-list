import { createContext, useState } from "react";
export let contextData = createContext({}) ; 
export default function Context({children}) {
    let storageData = [
    {
        id : 1 , 
        name : "My Day" , 
        icon : "fa-brands fa-angellist" , 
        iconColor : "gold" ,
        tasks : []
    } , 
    {
        id : 2 , 
        name : "Important" , 
        icon : "fa-regular fa-star" , 
        iconColor : "#ba758a" , 
        tasks: []
    } , 
    {
        id : 3 , 
        name : "Planned" , 
        icon : "fa-solid fa-rectangle-list" , 
        iconColor : "#78a878" , 
        tasks : []
    } , 
    {
        id : 4 , 
        name : "Groceries" , 
        icon : "fa-solid fa-basket-shopping" , 
        iconColor : "rgb(102 148 224)" , 
        tasks : []
    }
    ]
    if (!localStorage.getItem("catsATasks")) {
        localStorage.setItem("catsATasks" , JSON.stringify(storageData))
    }
    else {
        storageData = JSON.parse(localStorage.getItem("catsATasks")) ; 
    }
    let [value , setValue] = useState(storageData) ; 
    return <contextData.Provider value={{value , setValue}}>{children}</contextData.Provider>
}