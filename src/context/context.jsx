import { createContext, useState } from "react";
export let contextData = createContext({}) ; 
export default function Context({children}) {
    let defaultCats = [
    {
        name : "My Day" , 
        icon : "fa-brands fa-angellist" , 
        iconColor : "gold" ,
        tasks : []
    } , 
    {
        name : "Important" , 
        icon : "fa-regular fa-star" , 
        iconColor : "#ba758a" , 
        tasks: []
    } , 
    {
        name : "Planned" , 
        icon : "fa-solid fa-rectangle-list" , 
        iconColor : "#78a878" , 
        tasks : []
    } , 
    {
        name : "Groceries" , 
        icon : "fa-solid fa-basket-shopping" , 
        iconColor : "rgb(102 148 224)" , 
        tasks : [] 
    }]
    let [value , setValue] = useState({data : defaultCats , remove : false}) ; 
    return <contextData.Provider value={{value , setValue}}>{children}</contextData.Provider>
}