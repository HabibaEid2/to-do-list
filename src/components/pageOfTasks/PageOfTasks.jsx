import { useContext, useEffect, useRef, useState } from 'react'
import removeIcon from './../../images/remove-icon.png'
import calendeImg from './../../images/calender-img.png'
import img1 from './../../images/stars-background.jpeg'
import img2 from './../../images/background2.webp'
import img3 from './../../images/background3.webp'
import img7 from './../../images/background7.webp'
import img8 from './../../images/background8.webp'
import './pageOfTasks.css'
import { contextData } from '../../context/context'
import { useNavigate } from 'react-router-dom'

export default function PageOfTasks(props) {
    // states
    let [showThemes , setShowThemes] = useState(false) ; 
    let [theThemeColor , setTheThemeColor] = useState("bisque") ; 
    let [backgroundImage , setBackgroundImage] = useState(null) ;
    let [returnP , setReturnP] = useState(false)
    let context = useContext(contextData) ; 
    let input = useRef() ;
    let go = useNavigate() ; 

    //normal variables
    let title = {}
    let themesImgs = [img1 , img2 , img3 , img7 ,  img8]
    let themesColors = ['bisque' ,'#62c6c6', '#ffe185', '#caff85', '#85ffca', '#e185ff', '#ff85ce', '#ff8585', '#7cf8e8', '#a173ff', 'white' , "black"]
    let themesArr = [] ; 
    let tasks = [] ; 

        for(let i of context.value.data) {
            if(i.name === props.page){
                for(let j of i.tasks) {
                        tasks.push(
                        <div style={{color : theThemeColor}} className="task">
                            <div>
                                <i onClick={doTask} className={j.done ? "fa-solid fa-circle-check" : "fa-regular fa-circle-check"}></i>
                                <div style={j.done ? {textDecoration : "line-through"} : {textDecoration : "none"}} className="taskContent">{j.value}</div>
                            </div>
                            <img onClick={removeTask} style={{width : "15px" , height : '15px'}} src={removeIcon} alt='remove task'/>
                        </div>); 
                }
            }
        }
    
    for(let i of themesColors) {
        themesArr.push(<div style={{backgroundColor : i}} onClick={() => setTheThemeColor(`${i}`)} className="theme"></div>) ; 
    }
    for(let i of themesImgs) {
        themesArr.push(<div onClick={handleBackground} className="theme"><img src={i} alt="img4" /></div>)
    }
    for(let i of context.value.data) {
        if (i.name === props.page) {
            title = {
                value : i.name ,
                icon : i.icon ,
                color : i.iconColor
            }
        }
    }
    function showThemesF() {
        setShowThemes(!showThemes) ; 
    }
    useEffect(() => {
        if (input.current) {
            input.current.style.color = theThemeColor ; 
        }
    })
    function handleBackground(e) {
        setBackgroundImage(e.target.src)
    }
    function removeTheList() {
        mainLoop:for(let i of context.value.data) {
            if(i.name === title.value) {
                context.setValue(prev => {
                    prev.data.splice(context.value.data.indexOf(i) , 1) ; 
                    return {data : prev.data , remove : true} ; 
                })
                let arr = JSON.parse(localStorage.getItem("catsATasks")) ; 
                console.log(context.value.data.indexOf(i))

                arr.splice(context.value.data.indexOf(i) , 1)
                localStorage.setItem("catsATasks" , JSON.stringify(arr)) ; 
                break mainLoop ; 
            }
        }
        go(`/${context.value.data[context.value.data.length -2] ? context.value.data[context.value.data.length -2].name.split(" ").join("-") :  "to-do-list"}`) ; 
    }

    function addTheTask() {
        context.setValue(prev => {
            for(let i of prev.data) {
                if (i.name === title.value) {
                    i.tasks.push({value : input.current.value , done : false}) ; 
                } 
            }
            localStorage.setItem("catsATasks" , JSON.stringify(prev.data))
            setReturnP(!returnP)
            return prev ; 
        })
    }
    function removeTask(e) {
        let value = e.target.previousElementSibling.querySelector("div").innerHTML ; 
        let index ; 
        context.setValue(prev => {
            for(let i of prev.data) {
                if (i.name === props.page) {
                    for(let j of i.tasks) {
                        if (j.value === value) {
                            console.log("yes removed")
                            index = i.tasks.indexOf(j) ; 
                            console.log(index)
                        }
                    }
                    i.tasks.splice(index , 1)
                }
            }
            localStorage.setItem("catsATasks" , JSON.stringify(prev.data))
            return prev ; 
        })
        setReturnP(!returnP)
    }
    function doTask(e) {
        context.setValue(prev => {
            for(let i of prev.data) {
                if (i.name === props.page) {
                    for(let j of i.tasks) {
                        if (j.value === e.target.nextElementSibling.innerHTML) {
                            j.done = !j.done ; 
                            i.tasks[i.tasks.indexOf(j)] = {...j , done : j.done}
                        }
                    }
                }
            }
            localStorage.setItem("catsATasks" , JSON.stringify(prev.data))
            return prev ; 
        })
        setReturnP(!returnP)
    }
    return (
        <div className="pageOfTasks" style={{backgroundImage : `url(${backgroundImage})`}}>
            <h1 style={{color : theThemeColor}}>
                <i style={{color : title.color}} className={title.icon}></i>
                {title.value}
            </h1>
            <div className="themes">
                <button onClick={showThemesF}>
                    <i class="fa-solid fa-gear"></i>
                </button>
                <div style={showThemes ? {display : "block"} : {display : "none"}} className="bodyOfThemes">
                    <div>
                        {themesArr}
                    </div>

                    {/* remove the list */}

                    <button onClick={removeTheList}>
                        <i className="fa-solid fa-circle-minus"></i>remove
                    </button>
                </div>
            </div>

            {/* tasks list */}
            <div className="tasks">
                {tasks.length > 0 ? tasks : 
                <div className="calender-img">
                    <img src={calendeImg} alt='calender image'/>
                </div> 
                }</div>

            <div className="addTask">
                <label htmlFor="addTask">
                    <i onClick={addTheTask} style={{color : theThemeColor}} className='fa-solid fa-plus'></i>
                </label>
                <input ref={input} style={{color : theThemeColor}} className={`H${theThemeColor.slice(1)}`} type="text" id = "addTask" placeholder='add a task'/>
            </div>
        </div>
    )
}