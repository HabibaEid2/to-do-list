import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import PageOfTasks from './components/pageOfTasks/PageOfTasks';
import { Route , Routes, json} from 'react-router-dom';
import { useContext} from 'react';
import { contextData } from './context/context';

function App() {
  let routesA = [] ; 
  let context = useContext(contextData) ; 
    for(let i of context.value) {
      if(i.id === 1) {
        routesA.push(<Route key={-1} path={''} element = {<PageOfTasks page = {i.name}/>}></Route>)
      }
      routesA.push(<Route key={context.value.indexOf(i)} path={i.name.split(" ").join("-")} element = {<PageOfTasks page = {i.name}/>}></Route>)
    }
  return (
  <div className='parent'>
    <Dashboard/>
    <Routes>
      {routesA}
    </Routes>
  </div>
  )
}

export default App;
