import CardComponent from "./Card";
import { useState, useEffect } from "react";
import { Button, Dropdown, Spinner } from "@fluentui/react-components";
import Pagination from "./Pagination";

const OnGoing = (props) => {
  const [pages, setPages] = useState(1);
  const [numberOfTask,setNumberOfTask]=useState(5)
  const [onComlete,setOnComplete]=useState(false)
  // const [toggleRender,setToggleRender]=useState(false)
  // const { data } = useContext(TeamsFxContext);
  // const { loginuser } = useContext(TeamsFxContext);
  const [selectedData, setselectedData] = useState([]);
  // console.log("this data in onging to check", props.listData);
  useEffect(() => {
    setselectedData([]);
    props?.listData?.forEach((element) => {
      // console.log("This is element by", element);
      // console.log("This is start date", element?.fields?.StartDate);

      if (
        new Date(element.fields?.StartDate) <= new Date() &&
        element.fields.Status !== "Completed"
      ) {
        // console.log("we are in if condition -----");
        setselectedData((prev) => [...prev, element]);
      }
      // console.log("This is list data in useeffect", selectedData);
    });
  }, [props?.listData]);
  // console.log("this is selected data ", selectedData);
  // console.log("This is a data");

  // console.log("Loging Context in On GinG tab", loginuser.userPrincipalName);
  // console.log("This is a data in ongoing", data);

  ////select Handler /////
  // const selectPagehandler = (e, selectedpage) => {
  //   e.preventDefault();

  //   if (
  //     selectedpage >= 1 &&
  //     selectedpage <= Math.ceil(selectedData.length / numberOfTask) &&
  //     selectedpage !== pages
  //   ) {
  //     setPages(selectedpage);
  //   }
  // };
  
  return (<>
    {onComlete?(<div style={{width:"100%",height:"100%"}}><Spinner label="Completing The Task" labelPosition="below" /> </div>): 
    <div>
    {selectedData?.slice(pages * numberOfTask - numberOfTask, pages * numberOfTask).map((element) => {
      // console.log("This is created by", element.createdBy.email);
      // console.log("This is Reviwer in ", element.fields.Reviwer);
      // if (
      //   new Date(element.fields.StartDate) <= new Date() &&
      //   element.fields.Status !== "Completed" &&
      //   (element.createdBy.user.email === loginuser.userPrincipalName ||
      //     element.fields.ReviewerMail === loginuser.userPrincipalName)
      // ) {
      return (
        <div  key={element.fields.id} >
          <CardComponent
          
          setOnComplete={setOnComplete}
            element={element}
            setCallReload={props.setCallReload}
            tabName={"OnGoing"}
          />
        </div>
      );
    })}
    
  </div>}
  {/* {selectedData?.length > 0 && Math.ceil(selectedData?.length) >= numberOfTask && (
      <div
        className="pagination"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Button
          disabled={pages <= 1}
          onClick={(e) => {
            selectPagehandler(e, pages - 1);
          }}
          appearance="primary"
        >
          Prev
        </Button>
        <div className="PageIndex" style={{ display: "flex" }}>
          <Dropdown>
            
          </Dropdown>
          {[...Array(Math.ceil(selectedData.length / numberOfTask))].map((_, index) => {
            return (
              <span
                className={pages === index + 1 ? "selectedPage" : ""}
                onClick={(e) => {
                  selectPagehandler(e, index + 1);
                }}
                key={index}
              >
                {index + 1}
              </span>
            );
          })}
        </div>

        <Button
          disabled={Math.ceil(selectedData.length / numberOfTask) <= pages}
          onClick={(e) => {
            selectPagehandler(e, pages + 1);
          }}
          appearance="primary"
        >
          Next
        </Button>
      </div>
    )} */}
    
   <Pagination selectedData={selectedData} pages={pages}  setPages={setPages} numberOfTask={numberOfTask} setNumberOfTask={setNumberOfTask} />
   
  </>
  );
};
export default OnGoing;
