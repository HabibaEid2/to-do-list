import { Link } from "react-router-dom";
import './dashboard.css';
import { useContext, useEffect, useRef, useState } from "react";
import { contextData } from "../../context/context";

export default function Dashboard() {

    // States
    const [categories, setCategories] = useState([]);
    const [showDashboard, setShowDashboard] = useState(true);
    const [isNameUnique, setIsNameUnique] = useState(true);

    // Context
    const context = useContext(contextData);

    // Refs 
    const ulRef = useRef();

    // Variables
    let showDefaultCats = true;
    let catName = "Untitled list";
    const address = window.location.pathname.split("/").pop().split("-").join(" ");
    let checkNameOfPrevCats;

    console.log(address)
    // useEffects
    useEffect(() => {
        if (showDefaultCats) {
            const initialCategories = context.value.data.map((category, index) => (
                <li 
                    onClick={choose} 
                    className={category.name === address || (index === 0 && address === "to do list") ? "beforeTask" : ""} 
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

    useEffect(() => {
        if (context.value.remove) {
            const updatedCategories = context.value.data.map((category, index) => (
                <li 
                    onClick={choose} 
                    className={category.name === address || (index === 0 && address === "to do list") ? "beforeTask" : ""} 
                    key={category.name}
                >
                    <Link to={`/to-do-list/${category.name.split(" ").join("-")}`}>
                        <i style={{ color: category.iconColor }} className={category.icon}></i>
                        <div className="cat-name">{category.name}</div>
                    </Link>
                </li>
            ));
            setCategories(updatedCategories);
            context.setValue(prev => ({ ...prev, remove: false }));
        }
    }, [context]);

    // Functions

    // Create new category
    const addNewCategory = (isComplete) => {
        if (!isComplete) {
            setCategories(prev => [
                ...prev, 
                <li onClick={choose} key={`input-${prev.length + 1}`}>
                    <div className="create-cat-div">
                        <i style={{ color: "rgb(203 211 178)" }} className="fa-solid fa-list-check"></i>
                        <input 
                            onChange={(e) => {
                                checkNameOfPrevCats = context.value.data.findIndex((ele) => ele.name === e.target.value);
                                setIsNameUnique(checkNameOfPrevCats === -1);
                            }}
                            onKeyDown={(e) => {
                                if (e.code === "Enter" && isNameUnique && e.target.value.length >= 1) {
                                    context.setValue(prev => ({
                                        data: [...prev.data, {
                                            name: e.target.value, 
                                            icon: "fa-solid fa-list-check", 
                                            iconColor: "rgb(203 211 178)",
                                            tasks: []
                                        }],
                                        remove: false
                                    }));
                                    catName = e.target.value;
                                    addNewCategory(true);
                                }
                            }}
                            autoFocus 
                            defaultValue={'Untitled list'}
                        />
                    </div>
                    {!isNameUnique && <div className="check-name" style={{ color: "red" }}>* name already exists.</div>}
                </li>
            ]);
        } else {
            setCategories(prev => {
                const updated = [...prev];
                updated.splice(prev.length - 1, 1, 
                    <li onClick={choose} key={`category-${prev.length + 1}`}>
                        <Link to={`/to-do-list/${catName.split(" ").join("-")}`}>
                            <i style={{ color: "rgb(203 211 178)" }} className="fa-solid fa-list-check"></i>
                            <div>{catName}</div>
                        </Link>
                    </li>
                );
                return updated;
            });
            setIsNameUnique(true);
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
        <div style={{ marginLeft: showDashboard ? "0" : "-237px" }} className="dashboard">
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
    );
}
