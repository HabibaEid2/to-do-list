import { Link } from "react-router-dom";
import './dashboard.css'
import { useContext, useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import { contextData } from "../../context/context";
export default function Dashboard() {
    let [numOfTasks , setNumOfTasks] = useState(0) ; 
    let [cats , setCats] = useState([]) ; 
    let [nameOfCat , setNameOfCat] = useState("Untitled list") ; 
    let ul = useRef() ; 
    let input = useRef() ; 
    let cookie = new Cookies() ; 
    let context = useContext(contextData) ; 
    
    useEffect(() => {
        setCats([
            <li onClick={choose} className="beforeTask" key={1}>
                <Link to= {'My-Day'}>
                    <i style={{color : "gold"}} className="fa-brands fa-angellist"></i>
                    <div className="cat-name">My Day</div>
                    <div className="num">0</div>
                </Link>
            </li> , 
            <li onClick={choose} key={2}>
                <Link to={'Important'}>
                    <i style={{color : "#ba758a"}} className="fa-regular fa-star"></i>
                    <div className="cat-name">Important</div>
                    <div className="num">0</div>
                </Link>
            </li> , 
            <li onClick={choose} key={3}>
                <Link to={'Planned'}>
                    <i style={{color : "#78a878"}} className="fa-solid fa-rectangle-list"></i>
                    <div className="cat-name">Planned</div>
                    <div className="num">0</div>
                </Link>
            </li> , 
            <li onClick={choose} key={4}>
                <Link to={'Groceries'}>
                    <i style={{color : "rgb(102 148 224)"}} className="fa-solid fa-basket-shopping"></i>
                    <div className="cat-name" >Groceries</div>
                    <div className="num">0</div>
                </Link>
            </li>
        ])
    } , [])

    function addNewCat() {
        setCats(prev => { 
            return [...prev , 
            <li onClick={choose} key={prev.length + 1}>
                <Link to={`${nameOfCat.split(" ").join("-")}`}>
                    <i style={{color : "rgb(203 211 178)"}} className="fa-solid fa-list-check"></i>
                    <input 
                    onKeyDown={(e) => {
                        if(e.code === "Enter"){
                            e.target.readOnly = true ; 
                            e.target.style.borderBottom = "none"
                        }
                    }} 
                    ref={input} 
                    autoFocus 
                    defaultValue={'Untitled list'}
                    onChange={(e) => setNameOfCat(e.target.value)}
                    />
                    <div className="num">0</div>
                </Link>
            </li>]
        })
        context.setValue(prev => [...prev, {
            name : `${nameOfCat}` , 
            icon : "fa-solid fa-list-check" , 
            iconColor : "rgb(203 211 178)" ,
            tasks : []
            }])
        cookie.set("catsATasks" , context.value)
    }
    function choose(e) {
        let lis = ul.current.querySelectorAll("li") ; 
        for(let i of lis) i.classList.remove("beforeTask") ; 
        if(e.target.parentElement.tagName.toLowerCase() === "a") {
            e.target.parentElement.parentElement.classList.add("beforeTask")
        }
        else if (e.target.parentElement.tagName.toLowerCase() === "li") {
            e.target.parentElement.classList.add("beforeTask")
        }
        else {
            e.target.classList.add("beforeTask")
        }
    }
    return (
        <div className="dashboard">
            <ul ref={ul}>
                {cats}
            </ul>
            <div className="create-new-cat" onClick={addNewCat} >
                <i className="fa-solid fa-plus"></i>
                <button>New Category</button>
            </div>
        </div>
    )
}