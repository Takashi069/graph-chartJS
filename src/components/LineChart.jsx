// ./components/LineChart.js

import React, { useState,useRef, useEffect} from "react";
import titleContext from "../contexts/titleContext";
import Chart from "chart.js/auto"; // dont throw this away
import { Line } from "react-chartjs-2";
import Controls from "./Controls"
import "./LineChart.css"

const LineChart = ({title, filterOption,axisLabels}) => {

  
  const chart = useRef(null)

  const [labels,setLabels] = useState(null)

  const [data,setData] = useState({
    labels: labels,
    datasets: [      
    ],
  })
  useEffect(()=>{
    setData(prevData=>(
      {
        ...prevData,
        labels:labels
      }
    )
      
    )
  },[labels])

  const [graphTitle, setGraphTitle] = useState(title)
  const [xAxisName, setXAxisName] = useState("29 April - May 04 2021")
  const [yAxisName, setYAxisName] = useState("")
  const [yaxisStepSize, setYAxisStepSize] = useState(0)
  const [yfontSize, setYFontSize] = useState(10)
  const [xfontSize, setXFontSize] = useState(10)

  // const datasample3 = "[[W, Yellow], [T, Red], [F, Blue]]"
  // const datasample4 = "[[20, 10], [10, 50], [70, 30]]"

  return (
    <div className="wrapper">
      <div className="LineChart">
      <div className="title">
        <h2>{graphTitle}</h2>
        <h5 className="filter">{filterOption}</h5>
      </div>
      
{/* //---------------------GRAPH--------------------------- */}
    <div className="yaxisDetails">
        {yAxisName}
      </div>
      <Line data={data} ref={chart} options={{
        plugins:{
          legend:{
            display:false
          },
          tooltip:{
            enabled:true,
            backgroundColor:"#ffffff",
            bodyColor:"#000000",
            titleColor: "#000000",
            titleAlign: "center",
            titleFont:{
              weight:"normal"
            }
          }
        },
        elements:{
          point:{
            radius:4,
            hoverRadius:8
          }
        },
        scales: {

          x: {
             grid: {
                display: false
             },
             border:{
              width:3,
              color:"#898989"
             },
             ticks:{
              font:{
                size:xfontSize
              }
             }
          },
          y: {
            border:{
              display:false,
            },
            ticks:{
              align:'end',
              crossAlign:"center",
              stepSize:yaxisStepSize,
              font:{
                size:yfontSize
              } 
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
    <titleContext.Provider value={[setGraphTitle,setXAxisName,setYAxisName,setLabels,setData,setYAxisStepSize,setYFontSize,setXFontSize]} >
      <Controls labels={labels} setLabels={setLabels} data={data} title={title} xAxisName={xAxisName}/>
    </titleContext.Provider>
  </div>
    
  );
};

export default LineChart;