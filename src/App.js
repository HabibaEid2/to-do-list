import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import PageOfTasks from './components/pageOfTasks/PageOfTasks';
import { Route , Routes} from 'react-router-dom';
import { Cookies} from 'react-cookie';
import { useContext, useEffect, useState } from 'react';
import { contextData } from './context/context';

function App() {
  let [RoutesA , setRoutesA] = useState([]) ; 
  let context = useContext(contextData) ; 
  let cookie = new Cookies() ;  
  if (!cookie.get("catsATasks")) {
    cookie.set("catsATasks" , [
      {
        name : "My Day" , 
        icon : "fa-brands fa-angellist" , 
        iconColor : "gold" ,
        tasks : []
      } , 
      {
        name : "Important" , 
        icon : "fa-regular fa-star" , 
        iconColor : "#ba758a" , 
        tasks : []
      } , 
      {
        name : "Planned" , 
        icon : "fa-solid fa-rectangle-list" , 
        iconColor : "#78a878" , 
        tasks : []
      } , 
      {
        name : "Groceries" , 
        icon : "fa-solid fa-basket-shopping" , 
        iconColor : "rgb(102 148 224)" , 
        tasks : []
      }
      ])
    }
    useEffect(() => {
      for(let i of context.value) {
        setRoutesA(prev => [...prev , <Route path={i.name.split(" ").join("-")} element = {<PageOfTasks page = {i.name}/>}></Route>]) 
      }
    } , [])
  return (
  <div className='parent'>
    <Dashboard/>
    <Routes>
      {RoutesA}
    </Routes>
  </div>
  )
}

export default App;
