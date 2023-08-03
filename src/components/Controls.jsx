import "./Control.css"
import { useContext, useEffect } from "react";
import titleContext from "../contexts/titleContext";
const Controls = ({labels}) => {
    const [setTitle,setXAxisName,setLabels] = useContext(titleContext)
    const datasample = "[[W, 10], [T, 50], [F, 30], [THU, 45]]"
    const datasample2 = "[[10, W], [50, T], [30, F]]"

// ----------PARSING--------------------------
    const parseDataset = (data)=>{
    //-----------SORTING----------------------    
        const customSort = (tempLabel,xy)=>{
          //sort items based on index position
          //start with an item in the tempLabel list
          // if it exists in the xy dict, add that element in the 
          //sorted list first, else make the value of it 0
          let sortedDict = {}
          tempLabel.forEach(element => {
            if(xy[element] === undefined){
              sortedDict[element] = "0"
            }else{
              sortedDict[element] = xy[element]
            }
          });
          return sortedDict;
        }
    //-----------------------------------------------
        let newDataSample = data.slice(1,-1)
        // console.log(data)
        newDataSample= (newDataSample.split(/\[(.*?)\]/))
        // console.log(newDataSample)
        newDataSample = (newDataSample.filter(function (item){
          if(item === "" || item === ", ")
            return false
          else
            return true
        }))
        // console.log(newDataSample)
        //now for every item in newDataSample
        //check if the element on the left is the label (const) or the right
        var xy = {}
        newDataSample.forEach(element => {
          let arrayOfContents = element.split(", ")
          //if the first element is a string of letters, then it has to be 
          //in the label, else add it to the label
          //ONLY WORKS FOR 1 TYPE OF STRING
          if (labels.includes(arrayOfContents[0])){
            xy[arrayOfContents[0]] = arrayOfContents[1]
          }else{
            setLabels(prevList=>[...prevList, arrayOfContents[0]])
            // console.log("New Labels",labels)
            // console.log(arrayOfContents)
            xy[arrayOfContents[0]] = arrayOfContents[1];
        }  
        });
        console.log(xy)
        let sortedDict = customSort(labels,xy)
        console.log(sortedDict) 
      }
//-------------------------------------------
    return ( 
        <div className="control-parent">
            <h3>Graph Controls</h3>
            <form onSubmit={(e)=>{
                e.preventDefault()
                let datasetName = e.target.elements['dataset-name'].value
                let dataset = e.target.elements['data'].value
                console.log(datasetName,dataset)
                parseDataset(dataset)
                
            }} className="control">
                <input type="text" id="title" name="title" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}/>
                <input type="text" id="xaxis" name="xaxis" placeholder="X-axis Label Name" onChange={(e)=>{setXAxisName(e.target.value)}}/>
                <input type="text" id="yaxis" name="yaxis" placeholder="Y-axis Label Name" />
                <label>Dataset</label>
                <input type="text" id="dataset-name" name="dataset-name" placeholder="Name of Dataset" />
                <input type="text" id="data" name="data" placeholder="Data" />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
        
     );
}
 
export default Controls;