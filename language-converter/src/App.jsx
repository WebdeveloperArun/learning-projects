import { useState } from 'react'
import Translator from './components/Translator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Translator/>
    </>
  )
}

export default App
