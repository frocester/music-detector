import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Found from './Components/Found'
import { MusicDataProvider } from './context/MusicDataContext'

function App() {

  return (
    <div>
    <MusicDataProvider>
      <Routes> 
        <Route path='/' element = {<Home/>}/>
        <Route path='/found' element = {<Found/>}/>
      </Routes>
      </MusicDataProvider>
    </div>
  )
}

export default App
