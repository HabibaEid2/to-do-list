import { useContext, useEffect, useRef, useState } from 'react'
import img1 from './../../images/airbnb1.webp'
import img2 from './../../images/airbnb2.webp'
import img3 from './../../images/airbnb3.webp'
import img4 from './../../images/airbnb4.webp'
import './pageOfTasks.css'
import { contextData } from '../../context/context'
import { useNavigate } from 'react-router-dom'

export default function PageOfTasks(props) {
    // states
    let [showThemes , setShowThemes] = useState(false) ; 
    let [theThemeColor , setTheThemeColor] = useState("bisque") ; 
    let [backgroundImage , setBackgroundImage] = useState(null) ;

    let context = useContext(contextData) ; 
    let input = useRef() ; 
    let go = useNavigate() ; 

    //normal variables
    let title = {}
    let themesColors = ['bisque' ,'#62c6c6', '#ffe185', '#caff85', '#85ffca', '#e185ff', '#ff85ce', '#ff8585', '#7cf8e8', '#a173ff', 'white']
    let themesArr = [] ; 
    for(let i of themesColors) {
        themesArr.push(<div onClick={() => setTheThemeColor(`${i}`)} className="theme"></div>) ; 
    }
    for(let i of context.value.data) {
        if (i.name === props.page) {
            title = {
                id : i.id , 
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
        for(let i of context.value.data) {
            if(i.id === title.id) {
                context.setValue(prev => {
                    prev.data.splice(i.id-1 , 1) ; 
                    return {data : prev.data , remove : true} ; 
                })
                let arr = JSON.parse(localStorage.getItem("catsATasks")) ; 
                arr.splice(i.id-1 , 1)
                localStorage.setItem("catsATasks" , JSON.stringify(arr))
            }
        }
        go(`/${context.value.data[context.value.data.length -1].name.split(" ").join("-")}`) ; 
    }

    function addTheTask() {
        
    }
    return (
        <div className="pageOfTasks" style={{backgroundImage : `url(${backgroundImage})`}}>
            <h1 style={{color : theThemeColor}}>
                <i style={{color : title.color}} className={title.icon}></i>
                {title.value}
            </h1>
            <div className="themes">
                <button onClick={showThemesF}>. . .</button>
                <div style={showThemes ? {display : "block"} : {display : "none"}} className="bodyOfThemes">
                    <div>
                        {themesArr}
                        <div onClick={handleBackground} className="theme">
                            <img src={img1} alt="img1" />
                        </div>
                        <div onClick={handleBackground} className="theme">
                            <img src={img2} alt="img2" />
                        </div>
                        <div onClick={handleBackground}className="theme">
                            <img src={img3} alt="img3" />
                        </div>
                        <div onClick={handleBackground} className="theme">
                            <img src={img4} alt="img4" />
                        </div>
                    </div>

                    {/* remove the list */}

                    <button onClick={removeTheList}>
                        <i class="fa-solid fa-circle-minus"></i>remove
                    </button>
                </div>
            </div>
            <div className="addTask">
                <label htmlFor="addTask">
                    <i onClick={addTheTask} style={{color : theThemeColor}} className='fa-solid fa-plus'></i>
                </label>
                <input ref={input} style={{color : theThemeColor}} className={`H${theThemeColor.slice(1)}`} type="text" id = "addTask" placeholder='add a task'/>
            </div>
        </div>
    )
}