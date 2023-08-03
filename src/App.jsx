import { useState } from 'react'
import './App.css'
import LineChart from './components/LineChart'
function App() {
  
  return (
    <div className='main' style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      {/* <BrokenLine data={[1,2,3]}/> */}
      {/* <LineGraph/> */}
      <LineChart title={"Production"} filterOption={"Last 7 days"} />
    </div>
  )
}

export default App
