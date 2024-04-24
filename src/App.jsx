import { useState } from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
