import { useState, useEffect } from "react";
// import { TeamsFxContext } from "../Context";
import { Button } from "@fluentui/react-components";
import Pagination from "./Pagination";

import CardComponent from "./Card";

const Completed = (props) => {
  const [pages, setPages] = useState(1);
  const [selectedData, setselectedData] = useState([]);
  const [numberOfTask,setNumberOfTask]=useState(5)
  // const { data, loginuser } = useContext(TeamsFxContext);
  // console.log("Data in Completed", data, teamsUserCredential);

  useEffect(() => {
    setselectedData([]);
    props?.listData.forEach((element) => {
      // console.log("This is created by", element.createdBy.email);
      // console.log("This is Reviwer in ", element.fields.Reviwer);
      if (
        element?.fields.Status === "Completed"
        // (element.createdBy.user.email === loginuser.userPrincipalName ||
        //   element.fields.ReviewerMail === loginuser.userPrincipalName)
      ) {
        setselectedData((prev) => [...prev, element]);
      }
    });
  }, [props?.listData]);

  // console.log("Loging Context in On GinG tab", loginuser.userPrincipalName);
  // console.log("This is a data in ongoing", data);
  const selectPagehandler = (selectedpage) => {
    if (
      selectedpage >= 1 &&
      selectedpage <= Math.ceil(selectedData.length / 5) &&
      selectedpage !== pages
    ) {
      setPages(selectedpage);
    }
    // console.log("this");
  };

  return (
    <div>
      {selectedData?.slice(pages * numberOfTask - numberOfTask, pages * numberOfTask).map((element) => {
        // console.log("loginUser in element", loginuser);
        // console.log("loging forEach");

        return (
          <div key={element.fields.id}>
            <CardComponent element={element} tabName={"Completed"} />
          </div>
        );
      })}
      {/* {selectedData?.length > 0 && Math.ceil(selectedData?.length) >= 5 && (
        <div
          className="pagination"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Button
            disabled={pages <= 1}
            onClick={() => {
              selectPagehandler(pages - 1);
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
                  onClick={() => selectPagehandler(index + 1)}
                  key={index}
                >
                  {index + 1}
                </span>
              );
            })}
          </div>
          <Button
            disabled={Math.ceil(selectedData.length / 5) <= pages}
            onClick={() => {
              selectPagehandler(pages + 1);
            }}
            appearance="primary"
          >
            Next
          </Button>
        </div>
      )} */}
      <Pagination selectedData={selectedData} pages={pages}  setPages={setPages} numberOfTask={numberOfTask} setNumberOfTask={setNumberOfTask} />
    </div>
  );
};
export default Completed;
