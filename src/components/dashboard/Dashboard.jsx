import { Link } from "react-router-dom";
import './dashboard.css'
import { useContext, useEffect, useState } from "react";
import { contextData } from "../../context/context";

export default function Dashboard() {

    // states
    let [cats , setCats] = useState([]) ; 
    let [showDashBoard , setShowDashBoard] = useState(true) ; 
    let [checkName ,  setCheckName] = useState(true) ; 

    // context
    let context = useContext(contextData) ; 

    // normal variables
    let showDefaultCats = true ; 
    let catName = "Untitled list"
    let address = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1).split("-").join(" ") ; 
    let checkNameOfPrevCats ; 

    // useEffects

    useEffect(() => {

        // to show it once time not twice
        if (showDefaultCats) {
            for(let i of context.value.data) {
                setCats(prev =>{
                    return [...prev , 
                    <li onClick={choose} className = {i.name === address || (context.value.data.indexOf(i) === 0 && address === "to do list") ? "beforeTask" : ""} key={context.value.data.indexOf(i)}>
                        <Link to= {`/to-do-list/${i.name.split(" ").join("-")}`}>
                            <i style={{color : i.iconColor}} className= {i.icon}></i>
                            <div className="cat-name">{i.name}</div>
                        </Link>
                    </li>]
                })
            }
        }
        showDefaultCats = false ; 
    } , [])
    
    // for loops and if functions
    useEffect(() => {
        if (context.value.remove) {
            setCats([]) ; 
            for(let i of context.value.data) {
                setCats(prev =>{
                    return [...prev , 
                    <li onClick={choose} className = {i.name === address ||(context.value.data.indexOf(i) === 0 &&address === "to do list")  ? "beforeTask" : ""} key={context.value.data.indexOf(i)}>
                        <Link to= {`to-do-list/${i.name.split(" ").join("-")}`}>
                            <i style={{color : i.iconColor}} className= {i.icon}></i>
                            <div className="cat-name">{i.name}</div>
                        </Link>
                    </li>]
                })
            }
            context.setValue(prev => {
                return {...prev , remove : false} ; 
            }) ; 
        }
    })

    // functions

    // create new list
    function addNewCat(bool) {
        
        // bool for fully created or not
        if(!bool) {
            setCats(prev => { 
                return [...prev , 
                <li onClick={choose} key={prev.length + 1}>
                    <div className="create-cat-div">
                        <i style={{color : "rgb(203 211 178)"}} className="fa-solid fa-list-check"></i>
                        <input 
                        onChange={(e) => {
                            checkNameOfPrevCats = context.value.data.findIndex((ele) => ele.name === e.target.value) ;
                            if (checkNameOfPrevCats === -1) setCheckName(true) ;
                            else setCheckName(false) ; 
                        }}

                        onKeyDown={(e) => {
                            if(e.code === "Enter"){
                                checkNameOfPrevCats = context.value.data.findIndex((ele) => ele.name === e.target.value) ;
                                if (checkNameOfPrevCats === -1 && e.target.value.length >= 1) {
                                    context.setValue(prev => {
                                        return {data : [...prev.data, {
                                        name : `${e.target.value}` , 
                                        icon : "fa-solid fa-list-check" , 
                                        iconColor : "rgb(203 211 178)" ,
                                        tasks : []
                                        }] , remove : false}
                                    })
                                    catName = e.target.value ; 
                                    addNewCat(true) ;
                                    setCheckName(true) ;  
                                }
                                else setCheckName(false)
                            }
                        }}
                        autoFocus 
                        defaultValue={'Untitled list'}
                        />
                    </div>
                    {!checkName && <div className="check-name" style={{color : "red"}}>* name already exist.</div>}
                
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
            setCheckName(true) ; 
        }
    }

    // choose a list to style it
    function choose(e) {
        
        let lis = document.querySelector("ul.cats-list").querySelectorAll("li") ; 

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
            <ul className="cats-list">
                {cats}
            </ul>
            <div className="create-new-cat" onClick={() => addNewCat(false)} >
                <i className="fa-solid fa-plus"></i>
                <button>New Category</button>
            </div>
            <div onClick={() => setShowDashBoard(!showDashBoard)} className="showDashBoard">
                <i className="fa-solid fa-right-left"></i>
            </div>
        </div>
    )
}