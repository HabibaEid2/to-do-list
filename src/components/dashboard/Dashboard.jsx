import { Link, useNavigate } from "react-router-dom";
import './dashboard.css';
import { useContext, useEffect, useRef, useState } from "react";
import { contextData } from "../../context/context";
import { Error } from "../error/Error";

export default function Dashboard() {

    // States
    const [categories, setCategories] = useState([]);
    const [showDashboard, setShowDashboard] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [isCatNameComplete , setIsCatNameComplete] = useState(true)

    // Context
    const context = useContext(contextData);

    // Refs 
    const ulRef = useRef();

    const navigate = useNavigate() ; 

    // Variables
    let showDefaultCats = true;
    let catName = "Untitled list";
    const address = window.location.pathname.split("/").pop().split("-").join(" ");
    let checkNameOfPrevCats;
    let inputValue = null; 

    // to put the style on the latest one only
    if (ulRef.current) {
        for(let i of ulRef.current.querySelectorAll('li')) {
            i.classList.remove("beforeTask") ; 
            if (i.querySelector("div").innerHTML === address) i.className = "beforeTask" ; 
        }
    }

    // useEffects

    console.log(address.length)
    // to show default cats only one time
    useEffect(() => {
        if (showDefaultCats) {
            const initialCategories = context.value.data.map((category, index) => (
                <li 
                    onClick={choose} 
                    className={category.name === address || (index === 0 && (address === "to do list" || address.length === 0) ) ? "beforeTask" : ""} 
                    key={category.name}
                >
                    <Link to={`/to-do-list/${category.name.split(" ").join("-")}`}>
                        <i style={{ color: category.iconColor }} className={category.icon}></i>
                        <div className="cat-name">{category.name}</div>
                    </Link>
                </li>
            ));
            setCategories(initialCategories);
            showDefaultCats = false;
        }
    }, []);

    // show the new categories after remove item
    useEffect(() => {
        if (context.value.remove) {
            const updatedCategories = context.value.data.map((category, index) => {
                return ( <li 
                    onClick={choose} 
                    className={category.name === address || (index === 0 && address === "to do list") ? "beforeTask" : ""} 
                    key={category.name}
                    >
                    <Link to={`/to-do-list/${category.name.split(" ").join("-")}`}>
                        <i style={{ color: category.iconColor }} className={category.icon}></i>
                        <div className="cat-name">{category.name}</div>
                    </Link>
                </li> )
            });
            setCategories(updatedCategories);
            context.setValue(prev => ({ ...prev, remove: false }));
        }
    }, [context]);

    // Functions

    // Create new category
    const addNewCategory = (isComplete) => {

        // to prevent create a new category if the previous category name doesn't complete yet
        const checkInput = ulRef.current.querySelectorAll("input") ; 
        if (!isComplete) {
            if (checkInput.length === 0) {
                setCategories(prev => [
                    ...prev, 
                    <li onClick={choose} key={`input-${prev.length + 1}`}>
                        <div className="create-cat-div">
                            <i style={{ color: "rgb(203 211 178)" }} className="fa-solid fa-list-check"></i>
                            <input 
                                onKeyDown={(e) => {
                                    inputValue = e.target.value ; 
                                    setIsCatNameComplete(true) ; 
                                    checkNameOfPrevCats = context.value.data.findIndex((ele) => ele.name === inputValue);
                                    setShowAlert(checkNameOfPrevCats !== -1);
                                    if (e.code === "Enter" && checkNameOfPrevCats === -1 && e.target.value.length >= 1) {
                                        context.setValue(prev => ({
                                            data: [...prev.data, {
                                                name: inputValue, 
                                                icon: "fa-solid fa-list-check", 
                                                iconColor: "rgb(203 211 178)",
                                                tasks: []
                                            }],
                                            remove: false
                                        }));
                                        catName = inputValue;
                                        addNewCategory(true);
                                    }
                                }}
                                autoFocus 
                                defaultValue={'Untitled list'}
                            />
                        </div>
                    </li>
                ]);
            }
        }
        else { 
            setCategories(prev => {
                const updated = [...prev];
                updated.splice(prev.length - 1, 1, 
                    <li className="beforeTask" onClick={choose} key={`category-${prev.length + 1}`}>
                        <Link to={`/to-do-list/${catName.split(" ").join("-")}`}>
                            <i style={{ color: "rgb(203 211 178)" }} className="fa-solid fa-list-check"></i>
                            <div>{catName}</div>
                        </Link>
                    </li>
                );
                return updated;
            });
            navigate(`/to-do-list/${inputValue.split(" ").join("-")}`)
        }
    }

    // Choose a list to style it
    const choose = (e) => {
        const lis = ulRef.current.querySelectorAll("li");
        lis.forEach(li => li.classList.remove("beforeTask"));

        const target = e.target.closest("li");
        target.classList.add("beforeTask");
    }

    return (
        <>
        <div onClick={() => setShowAlert(false)} className='error' style={{ top: showAlert ? "20px" : "-300px" }}>
            <Error message = {"the category name already exists"}/>
        </div>
        <div style={{ marginLeft: showDashboard ? "0" : "-266px" }} className="dashboard">
            <ul ref={ulRef} className="cats-list">
                {categories}
            </ul>
            <div className="create-new-cat" onClick={() => addNewCategory(false)}>
                <i className="fa-solid fa-plus"></i>
                <button>New Category</button>
            </div>
            <div onClick={() => setShowDashboard(!showDashboard)} className="showDashBoard">
                <i className="fa-solid fa-right-left"></i>
            </div>
        </div>
        </>
    );
}
