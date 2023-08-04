import { useState } from 'react'
import './App.css'
import LineChart from './components/LineChart'
function App() {
  const [data,setData] = [
    {
      label:"Sample1",
      data:[[["W", 10], ["T", 50], ["F", 30]]]
    },
    {
      label:"Sample2",
      data:[[["M", 40], ["S", 80], ["Y", 90]]]
    }
  ]
  
  return (
    <div className='main' style={{minHeight:'100vh',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <LineChart 
        title={"Production"} 
        filterOption={"Last 7 days"} 
        axisLabels={['M','T','W','Th','F','S','Su']}
      
      
      />
    </div>
  )
}

export default App
