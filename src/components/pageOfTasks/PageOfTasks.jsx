import { useContext, useRef, useState } from 'react'
import removeIcon from './../../images/remove-icon.png'
import calendeImg from './../../images/calender-img.png'
import img1 from './../../images/stars-background.jpeg'
import img2 from './../../images/background2.webp'
import img3 from './../../images/background3.webp'
import img8 from './../../images/background8.webp'
import img9 from './../../images/background9.webp'
import img10 from './../../images/background10.webp'
import warningImg from './../../images/warning.png'
import { contextData } from '../../context/context'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import './pageOfTasks.css'

export default function PageOfTasks(props) {
    // states
    let [showThemes , setShowThemes] = useState(false) ; 
    let [theThemeColor , setTheThemeColor] = useState("bisque") ; 
    let [backgroundImage , setBackgroundImage] = useState(null) ;
    let [returnP , setReturnP] = useState(false) ; 
    let [showAlert , setShowAlert] = useState(false) ; 

    let context = useContext(contextData) ; 
    let input = useRef() ;
    let go = useNavigate() ; 

    //normal variables
    let title = {}
    let themesImgs = [img1 , img2 , img3 ,  img8 , img9 , img10]
    let themesColors = ['bisque' ,'#62c6c6', '#ffe185', '#caff85', '#85ffca', '#e185ff', '#ff85ce', '#ff8585', '#7cf8e8', '#a173ff', 'white' , "black"]
    let themesArr = [] ; 
    let tasks = [] ; 

    // loops and if conditions
    
    // show tasks of selected list 
        for(let i of context.value.data) {
            if(i.name === props.page){
                for(let j of i.tasks) {
                    tasks.push(
                    <div style={{color : theThemeColor}} className="task">
                        <div>
                            <i style={{cursor : "pointer"}} onClick={doTask} className={j.done ? "fa-solid fa-circle-check" : "fa-regular fa-circle-check"}></i>
                            <div style={j.done ? {textDecoration : "line-through"} : {textDecoration : "none"}} className="taskContent">{j.value}</div>
                        </div>
                        <img onClick={removeTask} style={{width : "15px" , height : '15px' , cursor : "pointer"}} src={removeIcon} alt='remove task'/>
                    </div>); 
                }
                title = {
                    value : i.name ,
                    icon : i.icon ,
                    color : i.iconColor
                }
            }
        }
    
    
    for(let i of themesColors) {
        themesArr.push(<div key={themesArr.length} style={{backgroundColor : i}} onClick={() => setTheThemeColor(`${i}`)} className="theme"></div>) ; 
    }
    for(let i of themesImgs) {
        themesArr.push(<div key={themesArr.length} onClick={(e) => setBackgroundImage(e.target.src)} className="theme"><img src={i} alt="img4" /></div>)
    }
    if (input.current) {
        input.current.style.color = theThemeColor ; 
    }

    // functions

    // remove a list
    function removeTheList() {
        if (context.value.data.length > 1) {
            let index ; 
            for(let i of context.value.data) {
                if(i.name === title.value) {
                    index = context.value.data.indexOf(i) ; 
                    context.setValue(prev => {
                        prev.data.splice(index , 1) ; 
                        return {data : prev.data , remove : true} ; 
                    }) 
                    title.value = context.value.data[index > 0 ? index -1 : index].name ; 
                    go(`/${context.value.data[index > 0 ? index -1 : index].name.split(" ").join("-") }`) ; 
                }
            }
        }
        else setShowAlert(true) ; 
    }

    function addTheTask() {
        context.setValue(prev => {
            for(let i of prev.data) {
                if (i.name === title.value) {
                    i.tasks.push({value : input.current.value , done : false}) ; 
                } 
            }
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
                            index = i.tasks.indexOf(j) ; 
                        }
                    }
                    i.tasks.splice(index , 1)
                }
            }
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
            return prev ; 
        })
        setReturnP(!returnP)
    }

    return (
        <>
        <Alert onClick={() => setShowAlert(false)} style={{top : showAlert ? "20px" : "-300px"}} variant={"danger"}>
            can't delete the list if it is the only list exist 
            <img 
                style={{marginLeft : "5px"}}
                src={warningImg} 
                alt="warning image" />
        </Alert>
        
        <div className="pageOfTasks" style={{backgroundImage : `url(${backgroundImage})`}}>
            <h1 style={{color : theThemeColor}}>
                <i style={{color : title.color}} className={title.icon}></i>
                {title.value}
            </h1>
            <div className="themes">
                <button onClick={() => setShowThemes(!showThemes)}>
                    <i className="fa-solid fa-gear"></i>
                </button>
                <div style={showThemes ? {display : "block"} : {display : "none"}} className="bodyOfThemes">
                    <div>
                        {themesArr}
                    </div>
                    <button onClick={removeTheList}>
                        <i className="fa-solid fa-circle-minus"></i>remove
                    </button>
                </div>
            </div>

            {/* tasks list */}
            <div className="tasks">
                {tasks.length > 0 ? tasks : <div className="calender-img">
                    <img src={calendeImg} alt='calender image'/>
                </div>}
            </div>
            <div className="addTask">
                <label htmlFor="addTask">
                    <i onClick={addTheTask} style={{color : theThemeColor}} className='fa-solid fa-plus'></i>
                </label>
                <input ref={input} style={{color : theThemeColor}} className={`H${theThemeColor.slice(1)}`} type="text" id = "addTask" placeholder='add a task'/>
            </div>
        </div>
        </>
    )
}