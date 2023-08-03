// ./components/LineChart.js

import React, { useState,useRef, useEffect} from "react";
import titleContext from "../contexts/titleContext";
import Chart from "chart.js/auto"; // dont throw this away
import { Line } from "react-chartjs-2";
import Controls from "./Controls"
import "./LineChart.css"

const LineChart = ({title, filterOption}) => {
  const chart = useRef(null)

  const [labels,setLabels] = useState(['W','Th','F','S','Su','M','T'])

let data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: "My Second dataset",
      backgroundColor: "rgb(150, 100, 132)",
      borderColor: "rgb(150, 100, 132)",
      data: [45, 10, 7, 6, 20, 90],
    },
    {
      label: "My third dataset",
      backgroundColor: "rgb(200, 80, 132)",
      borderColor: "rgb(200, 80, 132)",
      data: ['60','120',0,0,0,0],
    },
  ],
};

  const [dataset,setDataSet] = useState({label:"NULL",backgroundColor:"rgb(100,150,50)",borderColor:"rgb(100,150,50)",data: []})
  const [graphTitle, setGraphTitle] = useState(title)
  const [xAxisName, setXAxisName] = useState("29 April - May 04 2021")
  // const datasample3 = "[[W, Yellow], [T, Red], [F, Blue]]"
  // const datasample4 = "[[20, 10], [10, 50], [70, 30]]"

  const handleCallback = (controllerData)=>{
    setLabels(controllerData);
  }
  return (
    <div className="wrapper">
      <div className="LineChart">
      <div className="title">
        <h2>{graphTitle}</h2>
        <h5 className="filter">{filterOption}</h5>
      </div>
{/* //---------------------GRAPH--------------------------- */}
      <Line data={data} ref={chart} options={{
        plugins:{
          legend:{
            display:false
          },
          tooltip:{
            enabled:true,
            backgroundColor:"#ffffff",
            bodyColor:"#000000"
          }
        },
        scales: {

          x: {
             grid: {
                display: false
             },
             border:{
              width:5,
              color:"#898989"
             }
          },
          y: {
            border:{
              display:false,
            }
          }
        }
        }
      }/>
{/* ------------------------------------------------- */}
      <br></br>
      <div className="details">
        {xAxisName}
      </div>
      {/* <button onClick={()=>{parseDataset(datasample)}}>Sample1</button> */}
      {/* <button onClick={()=>{parseDataset(datasample2)}}>Sample2</button> */}
      {/* <button onClick={()=>{parseDataset(datasample3)}}>Sample3</button> */}
      {/* <button onClick={()=>{console.log("Back in parent",labels)
          // setLabels(['W','F','T'])
    }}>Sample4</button> */}
    </div>
    <titleContext.Provider value={[setGraphTitle,setXAxisName,setLabels]} >
      <Controls labels={labels} setLabels={setLabels}/>Labels
      <div>{labels}</div>
    </titleContext.Provider>
  </div>
    
  );
};

export default LineChart;