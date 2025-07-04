import { useState } from "react"
import CloudinaryUpload from "./Components/CloudinaryUpload";


function App() {
  const [value, setValue] = useState(0);

  const handleIncreament=()=>{
  setValue(value+1)
  }
  const handleDecreament =()=>{
    setValue(value-1)
  }

  return (
    <>
   <CloudinaryUpload />
    </>
  )
}

export default App
