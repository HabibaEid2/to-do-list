import { useContext, useRef, useState, useEffect } from 'react';
import removeIcon from './../../images/remove-icon.png';
import calendeImg from './../../images/calender-img.png';
import img1 from './../../images/stars-background.jpeg';
import img2 from './../../images/background2.webp';
import img3 from './../../images/background3.webp';
import img8 from './../../images/background8.webp';
import img9 from './../../images/background9.webp';
import img10 from './../../images/background10.webp';
import warningImg from './../../images/warning.png';
import { contextData } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import './pageOfTasks.css';

export default function PageOfTasks({ page }) {
    const [showThemes, setShowThemes] = useState(false);
    const [themeColor, setThemeColor] = useState("bisque");
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [returnP, setReturnP] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const context = useContext(contextData);
    const inputRef = useRef();
    const navigate = useNavigate();

    const themesImgs = [img1, img2, img3, img8, img9, img10];
    const themesColors = ['bisque', '#62c6c6', '#ffe185', '#caff85', '#85ffca', '#e185ff', '#ff85ce', '#ff8585', '#7cf8e8', '#a173ff', 'white', "black"];
    
    const [title, setTitle] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const list = context.value.data.find(i => i.name === page);
        if (list) {
            setTitle({
                value: list.name,
                icon: list.icon,
                color: list.iconColor
            });
            setTasks(list.tasks);
        }
    }, [context.value.data, page]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.color = themeColor;
        }
    }, [themeColor]);

    const handleThemeColorChange = (color) => {
        setThemeColor(color);
    };

    const handleBackgroundImageChange = (imageSrc) => {
        setBackgroundImage(imageSrc);
    };

    const removeList = () => {
        if (context.value.data.length > 1) {
            const findIndex = context.value.data.findIndex(i => i.name === title.value)
            const newData = context.value.data.filter(i => i.name !== title.value);
            context.setValue({ data: newData, remove: true });
            const newPage = newData[findIndex].name;
            navigate(`/to-do-list/${newPage.split(" ").join("-")}`);
        } else {
            setShowAlert(true);
        }
    };

    const addTask = () => {
        const taskValue = inputRef.current.value;
        context.setValue(prev => {
            const newData = prev.data.map(list => {
                if (list.name === title.value) {
                    return { ...list, tasks: [...list.tasks, { value: taskValue, done: false }] };
                }
                return list;
            });
            return { ...prev, data: newData };
        });
        setReturnP(!returnP);
    };

    const removeTask = (taskValue) => {
        context.setValue(prev => {
            const newData = prev.data.map(list => {
                if (list.name === page) {
                    return { ...list, tasks: list.tasks.filter(task => task.value !== taskValue) };
                }
                return list;
            });
            return { ...prev, data: newData };
        });
        setReturnP(!returnP);
    };

    const toggleTaskDone = (taskValue) => {
        context.setValue(prev => {
            const newData = prev.data.map(list => {
                if (list.name === page) {
                    const updatedTasks = list.tasks.map(task => task.value === taskValue ? { ...task, done: !task.done } : task);
                    return { ...list, tasks: updatedTasks };
                }
                return list;
            });
            return { ...prev, data: newData };
        });
        setReturnP(!returnP);
    };

    return (
        <>
            <Alert onClick={() => setShowAlert(false)} style={{ top: showAlert ? "20px" : "-300px" }} variant={"danger"}>
                can't delete the list if it is the only list exist 
                <img style={{ marginLeft: "5px" }} src={warningImg} alt="warning image" />
            </Alert>
            
            <div className="pageOfTasks" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h1 style={{ color: themeColor }}>
                    <i style={{ color: title.color }} className={title.icon}></i>
                    {title.value}
                </h1>
                <div className="themes">
                    <button onClick={() => setShowThemes(!showThemes)}>
                        <i className="fa-solid fa-gear"></i>
                    </button>
                    <div style={showThemes ? { display: "block" } : { display: "none" }} className="bodyOfThemes">
                        <div>
                            {themesColors.map((color, index) => (
                                <div key={index} style={{ backgroundColor: color }} onClick={() => handleThemeColorChange(color)} className="theme"></div>
                            ))}
                            {themesImgs.map((img, index) => (
                                <div key={index} onClick={(e) => handleBackgroundImageChange(e.target.src)} className="theme">
                                    <img src={img} alt={`img${index}`} />
                                </div>
                            ))}
                        </div>
                        <button onClick={removeList}>
                            <i className="fa-solid fa-circle-minus"></i>remove
                        </button>
                    </div>
                </div>

                {/* tasks list */}
                <div className="tasks">
                    {tasks.length > 0 ? tasks.map((task, index) => (
                        <div key={index} style={{ color: themeColor }} className="task">
                            <div>
                                <i
                                    style={{ cursor: "pointer" }}
                                    onClick={() => toggleTaskDone(task.value)}
                                    className={task.done ? "fa-solid fa-circle-check" : "fa-regular fa-circle-check"}
                                ></i>
                                <div style={task.done ? { textDecoration: "line-through" } : { textDecoration: "none" }} className="taskContent">
                                    {task.value}
                                </div>
                            </div>
                            <img onClick={() => removeTask(task.value)} style={{ width: "15px", height: '15px', cursor: "pointer" }} src={removeIcon} alt='remove task' />
                        </div>
                    )) : (
                        <div className="calender-img">
                            <img src={calendeImg} alt='calender image' />
                        </div>
                    )}
                </div>
                <div className="addTask">
                    <label htmlFor="addTask">
                        <i onClick={addTask} style={{ color: themeColor }} className='fa-solid fa-plus'></i>
                    </label>
                    <input ref={inputRef} style={{ color: themeColor }} type="text" id="addTask" placeholder='add a task' />
                </div>
            </div>
        </>
    );
}
