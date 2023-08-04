import { useContext } from "react"

const parseDataset = (data)=>{
    const [setLabels,setData] = useContext(titleContext)
    
    //-----------SORTING----------------------    
        const customSort = (tempLabel,xy)=>{
          //sort items based on index position
          //start with an item in the tempLabel list
          // if it exists in the xy dict, add that element in the 
          //sorted list first, else make the value of it 0
          if(tempLabel === null || tempLabel.length == 0){
            //if it is null, whatever is in xy's keys, set it as the labels
            if (tempLabel == null){
              tempLabel = []
            }
            for(const[key,value] of Object.entries(xy)){
              tempLabel.push(key)
            }
            setLabels(tempLabel)
            return xy
          }else{
            let sortedDict = {}
            for(const[key,value] of Object.entries(xy)){
              if(!tempLabel.includes(key))
                tempLabel.push(key)
            }
            setLabels(tempLabel)
            tempLabel.forEach(element => {
              if(xy[element] === undefined){
                sortedDict[element] = "0"
              }else{
                sortedDict[element] = xy[element]
              }
            });
            return sortedDict;
          }
        }
    //-----------------------------------------------
        let content = data.slice(1,-1)
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
        let xyKey = Object.keys(xy)[0]
        let xyValue = xy[xyKey]
        if (typeof(parseInt(xyKey)) === "number" && (typeof(Number.parseInt(xyValue)) === "NaN")){
            let newXy = {}
            let keys = Object.keys(xy)
            for(const [key,value] of Object.entries(xy)){
                newXy[value] = key
            }
            xy = Object.fromEntries(newXy)
        }
        let currentDataSetsInChart = dataInChart // to be used to remove labels when they are no longer in use
       
        console.log("final xy",xy);
        // console.log(xy)
        let sortedDict = customSort(labels,xy)
        // console.log(sortedDict) 
        return sortedDict
      }

export default parseDataset;