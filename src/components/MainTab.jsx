import { useContext, useState, useEffect } from "react";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import AddTask from "./AddTask";
import { GetSite } from "./util";
import { app } from "@microsoft/teams-js";
import {
  makeStyles,
  shorthands,
  TabList,
  Tab,
  Spinner,
  Field,
  Button,
  Card,CardHeader,Text,Caption1,
  Persona,
  CardPreview
} from "@fluentui/react-components";
import { SearchBox } from "@fluentui/react-search-preview";
import OnGoing from "./tabListFile/OnGoing";
import UpComing from "./tabListFile/Upcoming";
import Completed from "./tabListFile/Completed";
import { BearerTokenAuthProvider, createApiClient } from "@microsoft/teamsfx";
import { useData } from "@microsoft/teamsfx-react";
import {MoreHorizontal20Regular} from "@fluentui/react-icons";

// const showFunction = Boolean(config.apiName);
const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    ...shorthands.padding("50px", "20px"),
    rowGap: "20px",
  },
  text1:{
    color:"white",
    

  }
});
const functionName = "getData";
async function callFunction(teamsUserCredential, obj) {
  // const tokenAccess = (await teamsUserCredential.getToken(""))
  // console.log("e trying to fin Access in tab", tokenAccess)
  // sessionStorage.setItem("accessToken",`"${tokenAccess}"`)
  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }
  try {
    const apiBaseUrl = config.apiEndpoint + "/api/";
    // createApiClient(...) creates an Axios instance which uses BearerTokenAuthProvider to inject token to request header
    const apiClient = createApiClient(
      apiBaseUrl,
      new BearerTokenAuthProvider(
        async () => (await teamsUserCredential.getToken("")).token
      )
    );

    // cont listIdCheck=

    const response = await apiClient.post(functionName, obj);
    // console.log("response Data is  in tabApp",response.data);

    return response.data;
  } catch (err) {
    let funcErrorMsg = "";
    if (err?.response?.status === 404) {
      funcErrorMsg = `There may be a problem with the deployment of Azure Function App, please deploy Azure Function (Run command palette "Teams: Deploy") first before running this App`;
    } else if (err.message === "Network Error") {
      funcErrorMsg =
        "Cannot call Azure Function due to network error, please check your network connection status and ";
      if (err.config.url.indexOf("localhost") >= 0) {
        funcErrorMsg += `make sure to start Azure Function locally (Run "npm run start" command inside api folder from terminal) first before running this App`;
      } else {
        funcErrorMsg += `make sure to provision and deploy Azure Function (Run command palette "Teams: Provision" and "Teams: Deploy") first before running this App`;
      }
    } else {
      funcErrorMsg = err.message;
      if (err.response?.data?.error) {
        funcErrorMsg += ": " + err.response.data.error;
      }
    }
    throw new Error(funcErrorMsg);
  }
}

export default function Tab1(props) {
  const { theme, themeString, teamsUserCredential } =
    useContext(TeamsFxContext);
  const [siteId, setSiteId] = useState("");
  const [listToDoId, setListToDo] = useState("");
  const [listToTaskEntryId, setListToDoTaskEntry] = useState("");
  const [needConsent, setNeedConsent] = useState(false);
  const [callReload, setCallReload] = useState(false);
  const [userData, setUserData] = useState([]);
  const [checkData,setCheckData]=useState(true);
  const [listTimeArry, setListTimeArry] = useState([]);
  // const [userData, setUserData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("OnGoing");
  const [loginuser, setLoginUser] = useState("");
  const [listData, setListData] = useState([]);
  const[userName,setUserName]=useState("")
  const [finalData, setFinalData] = useState([]);
  const[countTask,setCounttask]=useState({
    CountOnGoing:0,
    CountUpcoming:0,
    CountCompleted:0
    
  })

  
  console.log(
    "This is a id of site list",
    props?.siteId,
    props?.listToDoId,
    props?.listToTaskEntryId
  );

  useEffect(() => {}, []);

  // const getUserData = async (teamsUserCredential) => {
  //   GetUserData(teamsUserCredential).then((Response) => {
  //     Response?.graphClientMessage?.value.forEach((element) => {
  //       // if (element?.createdBy?.user?.email) {
  //       //   const data = {
  //       //     id: element.fields.id,
  //       //     email: element.fields.EMail,
  //       //     name: element.createdBy.user.displayName,
  //       //   }}
  //       // console.log("loging data in response", data);
  //       // const newData = [...userData, data];
  //       // console.log("loging new data ", newData);
  //       setUserData((prev) => [...prev, element]);
  //     });

  // console.log("Dta of user----------- in ", userData);
  //   });
  // };

  const styles = useStyles();

  const { loading, data, reload } = useData(async () => {
    // let tanentUrl = "";
    // let loginInfo
    setCheckData(true)
    app.initialize().then(() => {
      // Get our frameContext from context of our app in Teams
      app.getContext().then(async (context) => {
        const userDispayName=await teamsUserCredential.getUserInfo()
        console.log("This is a context in main tab -----------??????", await teamsUserCredential.getUserInfo());
        const loginInfo = context.user;
         setUserName(userDispayName?.displayName)
        const tanentUrl = context.sharePointSite.teamSiteDomain;
        console.log("This is sharepoint tannet url", tanentUrl);

        setLoginUser(context.user);
        const obj = {
          siteName: "Teams_Site",
          listTodo: "ToDoTask",
          listTaskEntry: "To Do Task Entry",
          tanentUrl,
        };
        console.log("This is a main begore obj", obj);
        const res = await GetSite(teamsUserCredential, obj);
        console.log("This is response from backend ", res);
        const graphSiteid = res?.graphClientMessage;
        const graphListToDoId = res?.listIdToDo;
        const graphListToTaskEntryId = res?.listIdToDoEntry;
        console.log(
          "This is a respone of get siteId in main??????",
          graphSiteid,
          graphListToDoId,
          graphListToTaskEntryId
        );
        setSiteId(graphSiteid);
        setListToDo(graphListToDoId);
        setListToDoTaskEntry(graphListToTaskEntryId);

        console.log("this is again a response in a usedata", res);

        console.log("this is a user context info", loginuser);
        if (!teamsUserCredential) {
          throw new Error("TeamsFx SDK is not initialized.");
        }
        if (needConsent) {
          await teamsUserCredential.login(["User.Read"]);
          setNeedConsent(false);
        }
        if(graphSiteid && graphListToDoId &&graphListToTaskEntryId){
          try {
            const obj = {
              siteId: graphSiteid,
              listid1: graphListToDoId,
              listid2: graphListToTaskEntryId,
            };
            const functionRes = await callFunction(teamsUserCredential, obj);
            console.log("This is in export function data set", functionRes);
            // setListData(functionRes.graphClientMessage.value);
            setListTimeArry(functionRes.listArray.value);
            setUserData(functionRes.userInfo.value);
            setListData([]);
            setCounttask({CountOnGoing:0,
              CountUpcoming:0,
              CountCompleted:0})
            functionRes.graphClientMessage.value?.map((val) => {
              if (
                val.createdBy.user?.email === loginInfo?.userPrincipalName ||
                val.fields?.ReviewerMail === loginInfo?.userPrincipalName
              ) {
                console.log("This is working well");
                setListData((prev) => [...prev, val]);
                if (
                  new Date(val.fields?.StartDate) <= new Date() &&
                  val.fields.Status !== "Completed"
                ){
                  console.log("This is count in map on going????????",countTask.CountOnGoing)
                 
                  setCounttask((prevObj)=>({
                    ...prevObj,
                    "CountOnGoing":prevObj["CountOnGoing"]+1,
                  }))
                }
                if (
                  val?.fields.Status !== "Completed" &&
                  new Date(val.fields?.StartDate) > new Date()
                ) {
                  setCounttask((prevObj)=>({
                    ...prevObj,
                    "CountUpcoming":prevObj["CountUpcoming"]+1,
                  }))
                  
                }
                
              }
              
            });
            setCheckData(false)
           console.log("This is count ongoing in map function",countTask.CountOnGoing)
  
            return functionRes.graphClientMessage.value;
          } catch (error) {
            if (
              error.message.includes("The application may not be authorized.")
            ) {
              setNeedConsent(true);
            }
          }

        }
        
      });
    });
  }); // !
  console.log("This is a  user data -----a data", userData);
  const onTabSelect = (event, data) => {
    event.preventDefault();
    setSelectedValue(data.value);
  };
  

  const setSearch = (e) => {
    // e.preventDefault()
    // setSearchData(e.target.value)
    // console.log("This is event trigered",e.target.value)
    // console.log("This ia a data of event in search ",searchData)
    // if (searchData===""){

    //   return
    // }
    // else{

    let newArry = listData.filter((item) => {
      return item?.fields?.Title?.toLowerCase().includes(
        e.target.value.toLowerCase()
      );
    });

    console.log("This is a new array and its length", newArry.length, newArry);
    if (newArry.length > 0) {
      console.log("We are in check if  of array new");
      setFinalData([]);
      setFinalData((prev) => [...prev, ...newArry]);
    }

    //   console.log("This is a list array in serach bar",newArry)

    // console.log("This is a listData set in serach bar",finalData)
  };
  // console.log("This is set data  in usdata for tab",listData)
  // const getUserData = () => {
  //   console.log("clicked add");
  //   GetData(teamsUserCredential).then((Response) => {
  //     setUserData(Response?.graphClientMessage?.value);
  //   });
  //   console.log("Login the user data-------- in main tab", userData);
  // };
  // microsoftTeams.app.getContext().then((context) => {
  //   console.log("this is context", context);
  // });
  console.log("This is count of ongoing.....",countTask.CountOnGoing)
  if (callReload) {
    reload();
    console.log("We are call reload function")
    setCallReload(false);
  }
  console.log("this is a fetched data after load", listData);
  console.log("This i value of loading value  ......",loading)

  return (
    <TeamsFxContext.Provider
      value={{
        theme,
        themeString,
        teamsUserCredential,
        loading,
        userData,
        listTimeArry,
        siteId,
        listToDoId,
        listToTaskEntryId,
      }}
    >
      <div
        className={
          themeString === "default"
            ? "light"
            : themeString === "dark"
            ? "dark"
            : "contrast"
        }
      >
        <div>
      <Card
      
      className="CardProfile"
      // onClick={onClick}
    >
      <div className="Main" style={{display:"flex",justifyContent:"space-between"}}>
      <CardHeader
        // image={
        //   <img
        //     className={styles.logo}
        //     // src={resolveAsset("app_logo.svg")}
        //     alt="App name logo"
        //   />
        // }
        header={ <Persona 
          required
          size="large"
          avatar={{
            color: "colorful",
            "aria-hidden": true,
          }}
          primaryText={<Text className={styles.text1} size={500}>{userName}</Text>}
          name={userName}
          presence={{
            status: "available",
          }}
          secondaryText={<Text className={styles.text1}> Available</Text>}
          
        />}
      />
      <CardPreview>
        <div style={{display:"flex",flexDirection:"column"}}>
          <div><Text className={styles.text1} size={250} color="white">Task in Progress : {countTask.CountOnGoing}</Text></div>
        <div><Text  className={styles.text1} size={250} color="white">Up Coming Task : {countTask.CountUpcoming}</Text></div>
        
        </div>
       
      
        </CardPreview>
      </div>
      </Card>
      </div>
        {loading||checkData ? (
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Spinner label="Data loading" labelPosition="below"></Spinner>
          </div>
        ) : (
          <>
            <div className={styles.root}>
              <div
                className="headerBar"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "self-end",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "55%",
                    justifyContent: "flex-end",
                  }}
                >
                  <SearchBox
                    placeholder="Search Task By Title"
                    style={{ width: "50%" }}
                    onChange={(e) => {
                      setSearch(e);
                    }}
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <AddTask setCallReload={setCallReload} />
                </div>
              </div>

              <TabList
                selectedValue={selectedValue}
                onTabSelect={onTabSelect}
                // onClick={() => setCallReload(true)}
                size="large"
              >
                <Tab value="OnGoing">Ongoing</Tab>
                <Tab value="UpComing">Upcoming</Tab>
                <Tab value="Completed">Completed</Tab>
              </TabList>
            </div>
            <div>
              {selectedValue === "OnGoing" && (
                <div>
                  <OnGoing
                    setCallReload={setCallReload}
                    listData={finalData.length > 0 ? finalData : listData}
                  />
                </div>
              )}
              {selectedValue === "UpComing" && (
                <div>
                  <UpComing
                    setCallReload={setCallReload}
                    listData={finalData.length > 0 ? finalData : listData}
                  />
                </div>
              )}
              {selectedValue === "Completed" && (
                <div>
                  <Completed
                    setCallReload={setCallReload}
                    listData={finalData.length > 0 ? finalData : listData}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </TeamsFxContext.Provider>
  );
}
