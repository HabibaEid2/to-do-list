import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import PageOfTasks from './components/pageOfTasks/PageOfTasks';
import { Outlet, Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
  <div className='parent'>
    <Dashboard/>
    <Routes>
      <Route path='My-Day' element = {<PageOfTasks/>}/>
    </Routes>
  </div>
  )
}

export default App;
