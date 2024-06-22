import { useContext, useEffect, useRef, useState } from 'react'
import img1 from './../../images/airbnb1.webp'
import img2 from './../../images/airbnb2.webp'
import img3 from './../../images/airbnb3.webp'
import img4 from './../../images/airbnb4.webp'
import './pageOfTasks.css'
import { contextData } from '../../context/context'
export default function PageOfTasks(props) {
    let [showThemes , setShowThemes] = useState(false) ; 
    let [theThemeColor , setTheThemeColor] = useState("bisque") ; 
    let [backgroundImage , setBackgroundImage] = useState(null) ;
    let title = {}
    let context = useContext(contextData) ; 
    let input = useRef() ; 

    for(let i of context.value) {
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
    function rmeoveTheList() {
        for(let i of context.value) {
            if(i.id === title.id) {
                context.setValue(prev => {
                    prev.splice(i.id-1 , 1)
                })
                localStorage.setItem("catsATasks" , JSON.stringify(() => {
                    let arr = JSON.parse(localStorage.getItem("catsATasks")) ; 
                    arr.splice(i.id -1 , 1) ; 
                    return arr ; 
                }
                ))
            }
        }
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
                        <div onClick={() => setTheThemeColor("bisque")} className="theme"></div>
                        <div onClick={() => setTheThemeColor("#62c6c6")} className="theme"></div>
                        <div onClick={() => setTheThemeColor("#ffe185")} className="theme"></div>
                        <div onClick={() => setTheThemeColor("#caff85")} className="theme"></div>
                        <div onClick={() => setTheThemeColor("#85ffca")} className="theme"></div>
                        <div onClick={() => setTheThemeColor("#e185ff")} className="theme"></div>
                        <div onClick={() => setTheThemeColor("#ff85ce")} className="theme"></div>
                        <div onClick={() => setTheThemeColor("#ff8585")} className="theme"></div>
                        <div onClick={() => setTheThemeColor("#7cf8e8")} className="theme"></div>
                        <div onClick={() => setTheThemeColor("#a173ff")} className="theme"></div>
                        <div onClick={() => setTheThemeColor("white")} className="theme"></div>
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

                    <button onClick={rmeoveTheList}>
                        <i class="fa-solid fa-circle-minus"></i>
                        remove
                    </button>
                </div>
            </div>
            <div className="addTask">
                <label htmlFor="addTask">
                    <i style={{color : theThemeColor}} className='fa-solid fa-plus'></i>
                </label>
                <input ref={input} style={{color : theThemeColor}} className={`H${theThemeColor.slice(1)}`} type="text" id = "addTask" placeholder='add a task'/>
            </div>
        </div>
    )
}