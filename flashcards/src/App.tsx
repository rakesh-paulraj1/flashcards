import { Dashboard } from './flashcardspage/Dashboard'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import './App.css'
import { Signin } from './adminpage/Login'
import { Signup } from './adminpage/Signup'

const App:React.FC =()=> {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
