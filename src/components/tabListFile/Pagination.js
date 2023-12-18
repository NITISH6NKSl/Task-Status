import { Button,Dropdown,Option, Tooltip } from "@fluentui/react-components";
import {ArrowNext24Regular,ArrowPrevious24Regular,IosArrowRtl24Regular,IosArrow24Regular,IosArrowLtr24Regular} from "@fluentui/react-icons";
import { useState,useEffect } from "react";

const NumberTaskArray=[1,2,3,4,5,20]
const Pagination =(props)=>{
    console.log("This is a selected data in pagination",props?.numberOfTask)
    // const [pageArry,setPageArry]=useState([])
    const [firstPage,setFirstPage]=useState()
    const [lastPage,setLastPage]=useState()
    useEffect(() => {
        setFirstPage(1)
        setLastPage((Math.ceil(props?.selectedData?.length / props?.numberOfTask)))
     
    }, [props])
    
    const selectPagehandler = (e, selectedpage) => {
        e.preventDefault();
    
        if (
          selectedpage >= 1 &&
          selectedpage <= Math.ceil(props?.selectedData.length / props?.numberOfTask) &&
          selectedpage !== props?.pages
        ) {
          props?.setPages(selectedpage);
          
        }
      };
    const handleTaskNumber=(taskNumber)=>{
        // if(props?.pages*taskNumber<=props.selectedData.length){
            
            props?.setNumberOfTask(Number(taskNumber))
            props?.setPages(firstPage)
        
        

    }
    // const setingFirstPage=(page)=>{
    //     if (page==="FirstPage"){
    //         if (props?.selectedData.length>0){
    //             setFirstPage(1)
    //         }
    //     }
    //     if (page==="LastPage"){
    //         if(props?.selectedData.length>0){
    //             setLastPage((Math.ceil(props?.selectedData?.length / props?.numberOfTask)))
    //         }
    //     }
    // }
//Math.ceil(props?.selectedData?.length) >= props?.numberOfTask
return (<>
    {props?.selectedData?.length >= 0 &&  (
      <div
        className="pagination"
        style={{ display: "flex", justifyContent: "center",columnGap: "2vw",paddingBottom:"4vh" }}
      >
        <div style={{display:"flex",columnGap: "0.5vw"}}>
          <Tooltip content="First">
            <Button
              size="small"
              appearance="subtle"
              disabled={props?.pages===firstPage?true:false}
              icon={<ArrowPrevious24Regular/>}
              onClick={()=>{
                  props.setPages(firstPage)
                  console.log("This is to check click",firstPage)
                  }}>
                  
              </Button>
          </Tooltip>
          
            <Tooltip content="Prev"> 
              <Button
              size="small"
                disabled={props?.pages <= 1}
                onClick={(e) => {
                  selectPagehandler(e, props?.pages - 1);
                }}
                appearance="subtle"
                iconPosition="after"
                icon={<IosArrowLtr24Regular/>}
              />
            </Tooltip>
           
              
            
        </div>
        <div className="PageIndex" style={{ display: "flex"}}>
        <div style={{height:"95%",display:"flex",alignItems:"center",paddingRight:"1vw"}}>
        <Tooltip content="Select No. Of Task" relationship="label">
        <Dropdown size="small" 
        value={props?.numberOfTask}
        onOptionSelect={(e,data)=>{console.log("This is Option",data,)
            handleTaskNumber(data.optionValue)}}
        >
            {NumberTaskArray.map((option)=>{
                return(
                    <Option key={option} disabled={option === "Ferret"} text={option.toString()}>
                        {option}
                    </Option>
                )
                
            })}
          </Dropdown>
        </Tooltip>
         
          </div>
          <>
            
          {[...Array(Math.ceil(props?.selectedData.length / props?.numberOfTask))].map((_, index) => {
            return (
              <span 
                className={props?.pages === index + 1 ? "selectedPage" : ""}
                onClick={(e) => {
                  selectPagehandler(e, index + 1);
                }}
                key={index}
              >
                {index + 1}
              </span>
            );
          })}
          </>
        </div>
            <div style={{display:"flex",columnGap: "0.5vw"}}>
              <Tooltip content="Next">
              <Button
                  size="small"
                  disabled={Math.ceil(props?.selectedData.length / props?.numberOfTask) <= props?.pages}
                  onClick={(e) => {
                      selectPagehandler(e, props?.pages + 1);
                  }}
                  appearance="subtle"
                  iconPosition="center"
                  icon={<IosArrowRtl24Regular/>}
                />

              </Tooltip>
                <Tooltip content="Last">
                  <Button
                  disabled={props?.pages===lastPage?true:false}
                  appearance="subtle"
                  size="small"
                  onClick={()=>{props?.setPages(lastPage)}}
                  icon={<ArrowNext24Regular/>}
                  >
                  </Button>
                </Tooltip>  
            </div>
      </div>
    )}

    </>
)

}
export default Pagination