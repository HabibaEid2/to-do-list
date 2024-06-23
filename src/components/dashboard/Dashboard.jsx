import { Link } from "react-router-dom";
import './dashboard.css'
import { useContext, useEffect, useRef, useState } from "react";
import { contextData } from "../../context/context";

export default function Dashboard() {

    // states
    let [cats , setCats] = useState([]) ; 
    let [showDashBoard , setShowDashBoard] = useState(true) ; 

    // refs
    let ul = useRef() ; 
    let input = useRef() ; 

    // context
    let context = useContext(contextData) ; 

    // normal variables
    let showDefaultCats = true ; 
    let catName = "Untitled list"
    let address = window.location.pathname.slice(1).split("-").join(" ")
    useEffect(() => {
        if (showDefaultCats) {
            for(let i of context.value.data) {
                setCats(prev =>{
                    return [...prev , 
                    <li onClick={choose} className = {i.name === address || (context.value.data.indexOf(i) === 0 &&address === "to do list") ? "beforeTask" : ""} key={context.value.data.indexOf(i)}>
                        <Link to= {`to-do-list/${i.name.split(" ").join("-")}`}>
                            <i style={{color : i.iconColor}} className= {i.icon}></i>
                            <div className="cat-name">{i.name}</div>
                        </Link>
                    </li>]
                })
            }
        }
        showDefaultCats = false ; 
    } , [])

    useEffect(() => {
        if (context.value.remove) {
            setCats([]) ; 
            for(let i of context.value.data) {
                setCats(prev =>{
                    return [...prev , 
                    <li onClick={choose} className = {i.name === address ? "beforeTask" : ""} key={context.value.data.indexOf(i)}>
                        <Link to= {`to-do-list/${i.name.split(" ").join("-")}`}>
                            <i style={{color : i.iconColor}} className= {i.icon}></i>
                            <div className="cat-name">{i.name}</div>
                        </Link>
                    </li>]
                })
            }
        context.setValue(prev => {
            return {...prev , remove : false}
        })
        }
    })
    function addNewCat(bool) {
        if(!bool) {
            setCats(prev => { 
                return [...prev , 
                <li onClick={choose} key={prev.length + 1}>
                    <Link to = {"Untitled-list"}>
                        <i style={{color : "rgb(203 211 178)"}} className="fa-solid fa-list-check"></i>
                        <input 
                        onKeyDown={(e) => {
                            if(e.code === "Enter"){
                                context.setValue(prev => {
                                    return {data : [...prev.data, {
                                    name : `${e.target.value}` , 
                                    icon : "fa-solid fa-list-check" , 
                                    iconColor : "rgb(203 211 178)" ,
                                    tasks : []
                                    }] , remove : false}
                                })
                                localStorage.setItem("catsATasks" , JSON.stringify(
                                    [...JSON.parse(localStorage.getItem("catsATasks")) , {
                                        name : `${e.target.value}` , 
                                        icon : "fa-solid fa-list-check" , 
                                        iconColor : "rgb(203 211 178)" ,
                                        tasks : []
                                        }]
                                )) ;
                                catName = e.target.value ; 
                                addNewCat(true) ; 
                            }
                        }} 
                        ref={input} 
                        autoFocus 
                        defaultValue={'Untitled list'}
                        />
                    </Link>
                </li>]
            })
        }
        else {
            setCats(prev => { 
                prev.splice(prev.length -1 , 1 , <li onClick={choose} key={prev.length + 1}>
                    <Link to = {`to-do-list/${catName.split(" ").join("-")}`}>
                        <i style={{color : "rgb(203 211 178)"}} className="fa-solid fa-list-check"></i>
                        <div>{catName}</div>
                    </Link>
                </li>)
                return prev ; 
            })
        }
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
        <div style={{marginLeft : showDashBoard ? "0" : "-237px"}} className="dashboard">
            <ul ref={ul}>
                {cats}
            </ul>
            <div className="create-new-cat" onClick={() => addNewCat(false)} >
                <i className="fa-solid fa-plus"></i>
                <button>New Category</button>
            </div>
            <div onClick={() => setShowDashBoard(!showDashBoard)} className="showDashBoard">
                <i class="fa-solid fa-right-left"></i>
            </div>
        </div>
    )
}