import CardComponent from "./Card";
import { useState, useEffect } from "react";
import { Button, Spinner } from "@fluentui/react-components";

const OnGoing = (props) => {
  const [pages, setPages] = useState(1);
  const [onComlete,setOnComplete]=useState(false)
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
  const selectPagehandler = (e, selectedpage) => {
    e.preventDefault();

    if (
      selectedpage >= 1 &&
      selectedpage <= Math.ceil(selectedData.length / 5) &&
      selectedpage !== pages
    ) {
      setPages(selectedpage);
    }
  };
  
  return (<>
    {onComlete?(<div style={{width:"100%",height:"100%"}}><Spinner label="Adding New Task" labelPosition="below" /> </div>): <div>
    {selectedData?.slice(pages * 5 - 5, pages * 5).map((element) => {
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
    {selectedData?.length > 0 && Math.ceil(selectedData?.length) >= 5 && (
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
          {[...Array(Math.ceil(selectedData.length / 5))].map((_, index) => {
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
          disabled={Math.ceil(selectedData.length / 5) <= pages}
          onClick={(e) => {
            selectPagehandler(e, pages + 1);
          }}
          appearance="primary"
        >
          Next
        </Button>
      </div>
    )}
  </div>}
   
  </>
  );
};
export default OnGoing;
