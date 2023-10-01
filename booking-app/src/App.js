import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/home';
import Hotels from './components/Hotels';
import Hotel from './components/Hotel';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<><Home/></>}/>
          <Route path='/hotels' element = {<><Hotels/></>}/>
          <Route path='/hotels/:id' element = {<><Hotel/></>}/>
          <Route path='/login' element = {<><Login/></>}/>
          <Route path='/register' element = {<><Register/></>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
