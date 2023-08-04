import "./Control.css"
import { useContext, useEffect, useState } from "react";
import titleContext from "../contexts/titleContext";


const Controls = ({ labels, data, xAxisName, title }) => {

  const [setTitle, setXAxisName, setYAxisName,setLabels, setData, setYAxisStepSize, setYFontSize, setXFontSize] = useContext(titleContext)
  const [datasetInputs, setDatasetInputs] = useState([
    { name: "", data: "", color: "" }, // Initial empty dataset input
  ]);
  
  const [dataInChart, setDataInChart] = useState(null)

  const handleAddDataset = () => {
    setDatasetInputs(prevInputs => [...prevInputs, { name: "", data: "" }]);
  };
  const handleRemoveDataset = (index) => {
    setData((prevData) => {
      const newDatasets = [...prevData.datasets];
      newDatasets.splice(index, 1);
      return {
        ...prevData,
        datasets: newDatasets,
      };
    });

    const newInputs = [...datasetInputs];
    newInputs.splice(index, 1);
    setDatasetInputs(newInputs);
  };

  // ----------PARSING--------------------------
  const parseDataset = (data) => {
    //-----------SORTING----------------------    
    const customSort = (tempLabel, xy) => {
      //sort items based on index position
      //start with an item in the tempLabel list
      // if it exists in the xy dict, add that element in the 
      //sorted list first, else make the value of it 0
      if (tempLabel === null || tempLabel.length == 0) {
        //if it is null, whatever is in xy's keys, set it as the labels
        if (tempLabel == null) {
          tempLabel = []
        }
        for (const [key, value] of Object.entries(xy)) {
          tempLabel.push(key)
        }
        setLabels(tempLabel)
        return xy
      } else {
        let sortedDict = {}
        for (const [key, value] of Object.entries(xy)) {
          if (!tempLabel.includes(key))
            tempLabel.push(key)
        }
        setLabels(tempLabel)
        tempLabel.forEach(element => {
          if (xy[element] === undefined) {
            sortedDict[element] = "0"
          } else {
            sortedDict[element] = xy[element]
          }
        });
        return sortedDict;
      }
    }
    //-----------------------------------------------
    let content = data.slice(1, -1)
    const subArrays = content.match(/\[.*?\]/g);

    // Convert the sub-arrays to proper JavaScript arrays
    const keyValuePairs = subArrays.map(subArray => {
      const elements = subArray.match(/\w+/g); // Extract words from the sub-array
      return [elements[0], (elements[1])]; // Create key-value pair
    });

    // Convert key-value pairs to an object
    let xy = Object.fromEntries(keyValuePairs);
    /*
       Now have an additional check, if the data on the 
       left or right is a string AND the other data is a number,then 
       it means the data in the key should actually be the value and the
       data in the value should actually be the key
   */
    //----------------------------------------------------
    let xyKey = Object.keys(xy)[0]
    let xyValue = xy[xyKey]
    console.log(xyKey, isNaN(xyKey), xyValue, isNaN(xyValue))

    if (!isNaN(xyKey) && isNaN(xyValue)) {
      let newXy = {}
      for (const [key, value] of Object.entries(xy)) {
        newXy[value] = key
      }
      console.log(newXy)
      xy = Object.fromEntries(Object.entries(newXy))
    }
    //-----------------------------------------------------
    let currentDataSetsInChart = dataInChart // to be used to remove labels when they are no longer in use
    console.log("final xy", xy);

    console.log(xy);
    // console.log(xy)
    let sortedDict = customSort(labels, xy)
    // console.log(sortedDict) 
    return sortedDict
  }
  //-------------------------------------------
  const handleLabelChange = (e)=>{
    e.preventDefault();

    const inputField = e.target.querySelector('input[name="default-labels"]');
    const inputValue = inputField.value.trim(); //remove trailing and beginning whitespaces

    if (!inputValue) {
      
      return;
    }

    try {
      let input = inputValue.slice(1,-1) //remove the []
      input = input.split(',')
      console.log(input)
      // let parsedLabels = JSON.parse(inputValue);
      for (let index = 0; index < input.length; index++) {
        input[index] = input[index].trim();

      }
      setLabels(input);
    } catch (error) {
      // Invalid JSON format, handle accordingly (e.g., show an error message)
      console.log(error)
      window.alert("Error in Processing\nCheck if input is correct\nIf correct, then there's an error in parsing")
    }    

  }
  return (
    <div className="control-parent">
      <div className="graph-controls">
        <h3>Graph Controls</h3>
        <div className="control" onSubmit={(e) => e.preventDefault()}>
          <input className='input-field' type="text" id="title" name="title" placeholder="Set Title Name" onChange={(e) => { setTitle(e.target.value) }} />
          <input className='input-field' type="text" id="xaxis" name="xaxis" placeholder="Set X Axis Label" onChange={(e) => { setXAxisName(e.target.value) }} />
          <input className='input-field' type="text" id="yaxis" name="yaxis" placeholder="Set Y Axis Label" onChange={(e) => { setYAxisName(e.target.value) }}/>
          
          <form onSubmit={(e)=>{e.preventDefault()
            handleLabelChange(e)
          }} style={{display:'flex',flexDirection:'column'}}>
            <label htmlFor="range">X Axis Labels:</label>
            <input className="input-field" type="text" name="default-labels" placeholder="Mention Labels in [label1,label2] (No '' ) format"/>
            <button type="submit">Submit</button>
          </form>
          
          <label htmlFor="range">Y Axis Step Size</label>
          <input className="slider" type="range" name="range" min='1' max='100' step='5' defaultValue={1} onChange={(e) => { setYAxisStepSize(e.target.value) }} />
          <label htmlFor="range">Y Axis Font Size</label>
          <input className="slider" type="range" name="range" min='10' max='40' step='5' defaultValue={10}  onChange={(e) => { setYFontSize(e.target.value) }} />
          <label htmlFor="range">X Axis Font Size</label>
          <input className="slider" type="range" name="range" min='10' max='40' step='5' defaultValue={10} onChange={(e) => { setXFontSize(e.target.value) }} />
        </div>
      </div>
      <div className="dataset-controls">
        <label>Dataset</label>
        {/* Mapping over datasetInputs to create input fields */}
        {datasetInputs.map((input, index) => (
          <div key={index} className="dataset-input">
            <input
              className='input-field'
              type="text"
              name={`dataset-name-${index}`}
              placeholder="Name of Dataset"
              value={input.name}
              onChange={e => {
                const newInputs = [...datasetInputs];
                newInputs[index].name = e.target.value;
                setDatasetInputs(newInputs);
                // console.log(datasetInputs)
              }}
            />
            <input
              className='input-field'
              type="text"
              name={`data-${index}`}
              placeholder="Data"
              value={input.data}
              onChange={e => {
                const newInputs = [...datasetInputs];
                newInputs[index].data = e.target.value;
                setDatasetInputs(newInputs);
              }}
            />
            <input
              // className="data-color"
              type="color"
              name={`data-color-${index}`}
              defaultValue={'#000000'}
              onChange={e => {
                const newInputs = [...datasetInputs];
                newInputs[index].color = e.target.value;
                setDatasetInputs(newInputs);
              }}
            />
            <div className="buttonGroup">
              <button
                className="remove-button"
                onClick={() => { handleRemoveDataset(index) }}
              >
                Remove
              </button>
              <button value="Submit" className="submit-button" onClick={(e) => {
                e.preventDefault()
                let datasetName = input.name
                let dataset = input.data
                let datacolor = input.color
                if (datasetName === null || dataset === null || datasetName === "" || dataset === "") {
                  console.log("No Data")
                  return;
                } else {
                  // console.log("from field",datasetName,"from field",dataset)
                  let finalDict = parseDataset(dataset)
                  let dataFromDict = []
                  Object.keys(finalDict).forEach(function (key) {
                    // console.log(finalDict[key])
                    dataFromDict.push(finalDict[key])
                  })
                  // console.log(dataFromDict)
                  //Now update the data
                  //if it already exists, then only change the data else append the new data
                  if (data.datasets.length > index) {
                    setData((prevData) => {
                      const updatedDatasets = [...prevData.datasets];
                      updatedDatasets[index] = {
                        ...updatedDatasets[index],
                        label: datasetName,
                        data: dataFromDict,
                        backgroundColor: datacolor,
                        borderColor: datacolor,
                        // Add other properties you want to modify
                      };
                      return {
                        ...prevData,
                        datasets: updatedDatasets,
                      };
                    });
                  } else {
                    setData((prevData) => ({
                      ...prevData,
                      datasets: [
                        ...prevData.datasets,
                        {
                          label: datasetName,
                          backgroundColor: datacolor,
                          borderColor: datacolor,
                          data: dataFromDict,
                        },
                      ],
                    }));
                  }
                }
              }}
              >Submit</button>
            </div>

          </div>
        ))}
        <br></br>
        <button onClick={handleAddDataset}>Add More</button>
      </div>
    </div>
  );
}

export default Controls;