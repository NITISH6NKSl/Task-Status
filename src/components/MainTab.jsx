import { useContext, useState,useEffect} from "react";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import AddTask from "./AddTask";
import { GetSite } from "./util";
import { app } from "@microsoft/teams-js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {
  makeStyles,
  shorthands,
  TabList,
  Tab,
  Spinner,
  Card,
  CardHeader,
  Text,
  Persona,
  CardPreview,
  Badge,

} from "@fluentui/react-components";
import { SearchBox } from "@fluentui/react-search-preview";
import OnGoing from "./tabListFile/OnGoing";
import UpComing from "./tabListFile/Upcoming";
import Completed from "./tabListFile/Completed";
import { BearerTokenAuthProvider, createApiClient } from "@microsoft/teamsfx";
import { useData } from "@microsoft/teamsfx-react";
import { getprofile } from "./util";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    ...shorthands.padding("50px", "20px"),
    rowGap: "20px",
  },
  textColor: {
    color: "white",
  },
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
  const [checkData, setCheckData] = useState(true);
  const [listTimeArry, setListTimeArry] = useState([]);
  const [upComingData, setUpComingData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("OnGoing");
  const [loginuser, setLoginUser] = useState("");
  const [listData, setListData] = useState([]);
  const [userName, setUserName] = useState("");
  const[latestTaskData,setLatestTaskData]=useState([]);
  const [finalData, setFinalData] = useState([]);
  const [presence,setPresence] =useState('')
  const [countTask, setCounttask] = useState({
    CountOnGoing: 0,
    CountUpcoming: 0,
    CountCompleted: 0,
  });
const settingSlider = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  useEffect( () => {
    if(teamsUserCredential){
      getProfileIN(teamsUserCredential)
    }
   
  }, [teamsUserCredential])
  const getProfileIN=async(teamsUserCredential)=>{
    const tempPresence= await getprofile(teamsUserCredential)
    console.log("This is a profile presence---",tempPresence)
    setPresence(tempPresence?.graphClientMessage?.availability)
 } 

  // console.log(
  //   "This is a id of site list",
  //   props?.siteId,
  //   props?.listToDoId,
  //   props?.listToTaskEntryId
  // );

  const styles = useStyles();

  const { loading, data, reload } = useData(async () => {
    // let tanentUrl = "";
    // let loginInfo
    setCheckData(true);
    app.initialize().then(() => {
      // Get our frameContext from context of our app in Teams
      app.getContext().then(async (context) => {
        if (teamsUserCredential){
          console.log("THis is a teams user caditional",teamsUserCredential)
          const userDispayName = await teamsUserCredential?.getUserInfo();
          console.log(
            "This is a context in main tab -----------??????",
             context
          );
          const loginInfo = context.user;
          setUserName(userDispayName?.displayName);
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
          if (graphSiteid && graphListToDoId && graphListToTaskEntryId) {
            try {
              const obj = {
                siteId: graphSiteid,
                listid1: graphListToDoId,
                listid2: graphListToTaskEntryId,
              };
              const functionRes = await callFunction(teamsUserCredential, obj);
              // console.log("This is in export function data set", functionRes);
              // setListData(functionRes.graphClientMessage.value);
              setListTimeArry(functionRes.listArray.value);
              setUserData(functionRes.userInfo.value);
              setListData([]);
              setCounttask({
                CountOnGoing: 0,
                CountUpcoming: 0,
                CountCompleted: 0,
              });
              setUpComingData([])
              functionRes.graphClientMessage.value?.sort((a,b)=>{return  new Date(b.lastModifiedDateTime) - new Date(a.lastModifiedDateTime)}).map((val) => {
                if (
                  val.createdBy.user?.email === loginInfo?.userPrincipalName ||
                  val.fields?.ReviewerMail === loginInfo?.userPrincipalName
                ) {
                  
                  setListData((prev) => [...prev, val]);
                  if (
                    new Date(val.fields?.StartDate) <= new Date() &&
                    val.fields.Status !== "Completed"
                  ) {
                    setCounttask((prevObj) => ({
                      ...prevObj,
                      CountOnGoing: prevObj["CountOnGoing"] + 1,
                    }));
                  }
                  if (
                    val?.fields.Status !== "Completed" &&
                    new Date(val.fields?.StartDate) > new Date()
                  ) {
                    setCounttask((prevObj) => ({
                      ...prevObj,
                      CountUpcoming: prevObj["CountUpcoming"] + 1,
                    }));
                    setUpComingData((prev)=>[...prev,val])
                  }
                }
              });
              setCheckData(false);
              // console.log(
              //   "This is count ongoing in map function",
              //   countTask.CountOnGoing
              // );
  
              return functionRes.graphClientMessage.value;
            } catch (error) {
              if (
                error.message.includes("The application may not be authorized.")
              ) {
                setNeedConsent(true);
              }
            }
          }
          
        }
       
      })
    })
  }); 
  // console.log("This is a  user data -----a data", userData);
  const onTabSelect = (event, data) => {
    event.preventDefault();
    setSelectedValue(data.value);
  }

  const setSearch = (e) => {
    let newArry = listData.filter((item) => {
      return (
        item?.fields?.Title?.toLowerCase().includes(
          e.target.value.toLowerCase()
        ) ||
        item.createdBy?.user.displayName
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
    });

    // console.log("This is a new array and its length", newArry.length, newArry);
    if (newArry.length > 0) {
      // console.log("We are in check if  of array new");
      setFinalData([]);
      setFinalData((prev) => [...prev, ...newArry]);
    }
    else{
      setFinalData([]);
    }
    

  }
  const handleLatestTask=(value)=>{
    setLatestTaskData([])
     setSelectedValue("latestTask");
    setLatestTaskData((prev)=>[...prev,value])

  }
  const checkPresence=(presence)=>{
    console.log("This is a presence",presence)
    if(presence==="DoNotDisturb"){
      return "do-not-disturb"
    }
    else if(presence==="BeRightBack"){
      return "be-right-back"

    }
    else {
      return presence?.toLowerCase();
    }
  }

  // console.log("This is count of ongoing.....", countTask.CountOnGoing);
  if (callReload) {
    reload();
    console.log("We are call reload function");
    setCallReload(false);
  }
  // console.log("this is a fetched data after load", listData);
  // console.log("This is value of upcoming  ......", upComingData);
 
  return (
    <TeamsFxContext.Provider
      value={{
        theme,
        themeString,
        teamsUserCredential,
        loginuser,
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
            <div
              className="Main"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <CardHeader
                // image={
                //   <img
                //     className={styles.logo}
                //     // src={resolveAsset("app_logo.svg")}
                //     alt="App name logo"
                //   />
                // }
                header={
                  <div>
                    <Persona
                  required
                  size="extra-large"
                  avatar={{
                    color: "colorful",
                    "aria-hidden": true,
                  }}
                  
                  primaryText={
                    <Text className={styles.textColor} size={600}>
                      {userName}
                    </Text>
                  }
                  name={userName}
                  presence={{
                    status:  checkPresence(presence),
                  }}
                  secondaryText={
                    <Text className={styles.textColor}>{presence}</Text>
                  } 
                  />
                   </div>
                }
            />
           
                
              {!checkData?<CardPreview>
              <div>  
              <Text className={styles.textColor} size={350} >Total Task</Text>
                <div style={{ display: "flex", flexDirection: "column",paddingLeft:"10px"}}>
               
                  <div>
                  <div>
                    <Text className={styles.textColor}>{countTask.CountOnGoing}</Text>
                  </div>
                    <Text className={styles.textColor} style={{}} size={100}>
                      Task in Progress{" "}
                    </Text>
                  </div>
                 
                  <div>
                  <div>
                    <Text className={styles.textColor} >{countTask.CountUpcoming}</Text>
                  </div>
                    <Text className={styles.textColor} size={100} style={{}}>
                      Up Coming Task
                    </Text>
                  </div>
                 
                </div>
                </div>
              </CardPreview>
              :<Spinner/>}
              {}
              {!checkData ?
               <div className="upComingHeadCard" style={{paddingRight:"25px"}}>
               <Text size={300} className={styles.textColor}>Latest Up Coming Task</Text>
               {upComingData.length>0?<Slider {...settingSlider}>
                {upComingData?.sort((a,b)=>{return new Date(a.fields.StartDate)-new Date(b.fields.StartDate)}).map((value,index)=>{
                 const Enddate=new Date(value?.fields.EndDate)
                 const DisplayEndDate=`${Enddate.getDate()}/${Enddate.getMonth()}/${Enddate.getFullYear()}`
                 return (
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",backgroundColor:"transparent"}}>
                  <Card style={{width:"100%",background:"transparent",cursor:"pointer"}} onClick={(e)=>{handleLatestTask(value)}} >
                    <CardHeader header={<Text className={styles.textColor} size={200} >{value.fields.Title}</Text>}/>
                    <CardPreview
                    >
                    <div>
                      <div className="upComingBody" style={{display:"flex"}}>
                      <Badge size="extra-large" shape="rounded" color="important" appearance="tint" >
                       <div>
                         <div className="dateBadge" style={{height:"50%"}}  ><Text className={styles.textColor} size={30}  weight="bold">{new Date(value.fields.StartDate).getDate()}</Text></div>
                         <div className="monthBadges" ><Text className={styles.textColor} size={25}>{new Date(value.fields.StartDate).toLocaleString('default', { month: 'short' })}</Text></div>
                       </div>
                       </Badge>
                      <div style={{paddingLeft:"5px"}}>
                        <Text className={styles.textColor} size={100} >End date : {DisplayEndDate}</Text ><br/>
                        <Text className={styles.textColor} size={100}> For {value.fields.ReviewerDipalyName}</Text >
                      </div>
                      </div>
                    </div>
                    </CardPreview>
                  </Card>

                  </div>
                 )
                })} 
               </Slider>
               :<div><Text className={styles.textColor}>No Upcoming Task</Text></div>
               }
               
             </div>
             :<Spinner/>
              }
             
            </div>
          </Card>
        </div>
        {loading || checkData ? (
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
                  <AddTask setCallReload={setCallReload} userName={userName} />
                  
                </div>
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
              {selectedValue ==="latestTask" && ( <div>
                  <UpComing
                    listData={latestTaskData}
                  />
                </div>)}
            </div>
          </>
        )}
      </div>
    </TeamsFxContext.Provider>
  );
}
