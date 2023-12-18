import * as React from "react";
import { useContext, useEffect } from "react";
import { TeamsFxContext } from "../Context";
import config from "../sample/lib/config";
import { GetItems } from "../util";
import {
  makeStyles,
  shorthands,
  Button,
  Body1Strong,
  Title3,
  Field,
  ProgressBar,
  Spinner,
  Tooltip,
  Dialog,
  DialogActions,
  DialogBody,
  DialogSurface,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Text,
  Divider
} from "@fluentui/react-components";
import {
  PlayCircle24Regular,
  RecordStop24Regular,
  TextboxMore24Regular,
  TextMore24Regular,
  AppsListDetail24Regular,
  MoreHorizontal24Filled,
  Info24Regular
} from "@fluentui/react-icons";
import {
  Card,
  CardHeader,
  CardFooter,
  CardPreview,
} from "@fluentui/react-components";
import { useState } from "react";
import { Notifiy, Update, playPause } from "../util";
const useStyles = makeStyles({
  main: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    columnGap: "16px",
    rowGap: "36px",
  },

  title: {
    ...shorthands.margin(0, 0, "8px"),
   
  },

  description: {
    ...shorthands.margin(0, 0, "10px"),
    
  },
  textColor:{
    color:"white"
  },

  card: {
    width: "100%",
    maxWidth: "100%",
    height: "fit-content",
    marginBottom: "25px",
    backgroundColor:"transparent",
  

//     background: rgb(34,193,195);
// background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
  },
  // cardHover:{
  //   backgroundColor:"red",
  //   width: "100%",
  //   maxWidth: "100%",
  //   height: "fit-content",
  //   marginBottom: "25px",

  // },

  text: {
    ...shorthands.margin(0),
  },
  btn: {
    size: "small",
  },
  container: {
    ...shorthands.margin("5px", "0px"),
  },
  cardbodyText: {
    marginRight: "35px",
  },
});

const CardComponent = (props) => {
  const [isPlay, setplay] = useState("");
  const [isActualHourSet, setIsActualHourSet] = useState("");
  const [load, setLoad] = useState(false);
  const [loader, setLoader] = useState(true);
  const [newPlay, setNewPlay] = useState("");
  // const [hoverColor,setHoverColor]=useState(false)
  
  // console.log("Loging the is paly in cards", isPlay);
  const {
    teamsUserCredential,
    listTimeArry,
    loginuser,
    siteId,
    listToDoId,
    listToTaskEntryId,
  } = useContext(TeamsFxContext);
  useEffect(() => {
    if (load) {
      handleToggelBtn(newPlay);
    }
  },[newPlay]);
  useEffect(() => {
    if(props.tabName==="OnGoing"){
      // console.log("This is a site, id and all", siteId, listToDoId);
      const obj = {
        siteId: siteId,
        listToDoId: listToDoId,
        itemsId: props.element.fields.id,
      };
      GetItemsData(teamsUserCredential, obj);
    }
    else{
      setLoader(false);
    }
   
  },[props.element]);
  const GetItemsData = async (teamsUserCredential, obj) => {
    const response = await GetItems(teamsUserCredential, obj);
    // console.log(
    //   "This is a play by graph of single call????????",
    //   response?.fields.IsPlay,
    //   response?.fields.Title
    // );

    setplay(response?.fields.IsPlay);
    setLoader(false);
  };

  let timeEntryArr = [];
  let listTimeArrId = [];
  const listTimeEntry = listTimeArry.filter((time) => {
    if (time?.fields?.Id0 === props?.element?.fields?.id) {
      timeEntryArr.push(time.fields?.EntryExitTime);
      listTimeArrId.push(time?.fields?.id);
      return time.fields?.EntryExitTime;
    }
    return null
  });

  // const CheckActualStart = () => {
  //   console.log("This is a Arry Length data", timeEntryArr.length);
  //   if (timeEntryArr.length >= 1) {
  //     return timeEntryArr[0];
  //   } else {
  //     return undefined;
  //   }
  // };
  // console.log(
  //   "This is a TimeEntry array",
  //   timeEntryArr.props?.element?.fields?.Title
  // );
  timeEntryArr = timeEntryArr.sort((a, b) => new Date(a) - new Date(b));
  // console.log(
  //   "This is a senond arry",
  //   timeEntryArr,
  //   props?.element?.fields?.Title
  // );

  let actualHour = 0;
  let actualMinute = 0;
  // debugger;
  for (let i = 0; i < timeEntryArr.length; i += 2) {
    if (timeEntryArr.length !== i + 1) {
      const timeDifference =
        new Date(timeEntryArr[i + 1]) - new Date(timeEntryArr[i]);

      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      actualHour += hours;
      actualMinute += minutes;
    }
    if (actualMinute > 60) {
      actualHour += Math.floor(actualMinute / 60);
      actualMinute = actualMinute % 60;
    }
  }
  let ActualTime = Number(actualHour + "." + actualMinute);
  console.log(
    "This is a actual time",
    ActualTime,
    props?.element?.fields.Title
  );
  const check = {
    date: true,
    setEstimateTime: false,
    setActualTime: false,
    setTaskButton: false,
    setProgressBar: false,
    completeBtnVisbile: false,
    reviwer: false,
    ActualStartBtn: false,
  };
  // const sendActivityNotification = {
  //   topic: {
  //     source: "entityUrl",
  //     value: "https://graph.microsoft.com/v1.0/chats/{chatId}",
  //   },
  //   activityType: "taskCreated",
  //   previewText: {
  //     content: "New Task Created",
  //   },
  //   recipient: {
  //     "@odata.type": "microsoft.graph.aadUserNotificationRecipient",
  //     userId: "1cc562b8-c0cd-472b-b5be-451d2758ed86",
  //   },
  //   templateParameters: [
  //     {
  //       name: "taskId",
  //       value: "12322",
  //     },
  //   ],
  // };
  // console.log("Loging Config teams id", config.teamsAppId);
  const sendNotification = {
    siteId: siteId,
    listId: listToTaskEntryId,
    componentId: props.element.fields.id,
    reviewerUserId: props?.element?.fields?.ReviewerId,
    sendActivityNotification: {
      topic: {
        source: "text",
        value: "Task Completed",
        webUrl: `https://teams.microsoft.com/l/entity/${config.teamsAppId}/index`,
      },
      activityType: "taskCompleted",
      previewText: {
        content: `${props?.element?.fields?.Title} Task Completed`,
      },
      templateParameters: [
        // {
        //   name: "taskId",
        //   value: (props?.element?.fields?.id).toString(),
        // },
        {
          name: "taskName",
          value: props?.element?.fields?.Title.toString(),
        },
      ],
    },
    sendMail: {
      message: {
        subject: "Task  Status",
        body: {
          contentType: "Text",
          content: `${props?.element?.fields?.Title} " Task is Completed By " ${props?.element?.createdBy.user?.displayName}
           Assignee: ${props?.element?.createdBy.user?.displayName}
           Status: Completed
           Reviwer:${props?.element?.fields?.ReviewerDipalyName}
           Start Date: ${props?.element?.fields?.StartDate}
           End Date: ${props?.element?.fields?.EndDate}
           Estimated Hours: ${props?.element?.fields?.EstimatedHours}
           Actual Hour : ${props?.element?.fields?.ActualHours}`,
        },
        toRecipients: [
          {
            emailAddress: {
              address: props?.element?.fields?.ReviewerMail,
            },
          },
        ],
        // ccRecipients: [
        //   {
        //     emailAddress: {
        //       address: "danas@contoso.onmicrosoft.com",
        //     },
        //   },
        // ],
      },
      saveToSentItems: "false",
    },
    status:"Complete"
  };
  console.log("This is a data in card s", props.element);

  // console.log("we are checkinhg for play btn", props?.element?.fields?.IsPlay);
  // console.log("Log dat", props);
  const Styles = useStyles();
  // const progressBarValue=()={}
  let progreessValue =
    (ActualTime * 100) / props.element.fields.EstimatedHours / 100;

  const ProgressColor = () => {
    if (ActualTime && progreessValue <= 0.8) {
      return "success";
    } else if (ActualTime && progreessValue > 0.8 && progreessValue <= 0.99) {
      return "warning";
    } else if (ActualTime && progreessValue > 0.99) {
      return "error";
    }
  };

  const formateDate = (date) => {
    const selectedDate = new Date(date); // pass in date param here
    const formattedDate = `${
      selectedDate.getMonth() + 1
    }/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;

    return formattedDate;
  };
  const setLocalStroage = (data) => {
    localStorage.setItem("IsPlayCheck", data);
  };

  const handleToggelBtn = (handle) => {

    if (handle) {
      let objMain;
      // console.log(
      //   "This is tile of selected compo start date data",
      //   props.element.fields.ActualStartDate
      // );
      if (
        props.element.fields.ActualStartDate === undefined &&
        isActualHourSet === ""
      ) {
        // console.log("This is a check length array in if");
        const ActualStartDate = new Date();
        objMain = {
          siteId: siteId,
          listId: listToDoId,
          itemsId: props?.element?.fields?.id,
          field: { IsPlay: "Pause", ActualStartDate: ActualStartDate },
        };
      } else {
        // console.log("This else condition to check listtimeArry");
        objMain = {
          siteId: siteId,
          listId: listToDoId,
          itemsId: props.element.fields.id,
          field: { IsPlay: "Pause" },
        };
      }
      Update(teamsUserCredential, objMain).then((Response) => {
        // console.log(
        //   "Resopone in update",
        //   Response?.receivedHTTPRequestBody?.field?.IsPlay
        // );
        // console.log("Response", Response);
        setIsActualHourSet(
          Response?.receivedHTTPRequestBody?.field?.ActualStartDate
        );
        setplay(Response?.receivedHTTPRequestBody?.field?.IsPlay);
        setLocalStroage(Response?.receivedHTTPRequestBody?.field?.IsPlay);
        // setNewPlay(true);
      });
      var date = new Date();
      const obj = {
        siteId: siteId,
        listId: listToTaskEntryId,
        field: {
          Title: props.element.fields.Title,
          EntryExitTime: date,
          Id0: props?.element?.fields?.id,
        },
      };
      console.log("This is a paly pasuse list id", listToTaskEntryId);
      playPause(teamsUserCredential, obj).then((response) => {
        setLoad(false);
      });
    } else {
      Update(teamsUserCredential, {
        siteId: siteId,
        listId: listToDoId,
        itemsId: props.element.fields.id,
        field: { IsPlay: "Play" },
      }).then((Response) => {
        setplay(Response?.receivedHTTPRequestBody?.field?.IsPlay);
      });
      var timePause = new Date();
      const obj = {
        siteId: siteId,
        listId: listToTaskEntryId,
        field: {
          Title: props.element.fields.Title,
          EntryExitTime: timePause,
          Id0: props?.element?.fields?.id,
        },
      };
      console.log("This is a paly pasuse list id", listToTaskEntryId);
      playPause(teamsUserCredential, obj).then((response) => {
        setLoad(false);
      });
    }
  };
  const handleCompleteBtn = async () => {
    props.setOnComplete(true)
    // const ActualStartDate = await CheckActualStart();
    // console.log("This is a Actual Satart date", ActualStartDate);
    const obj = {
      siteId: siteId,
      listId: listToDoId,
      itemsId: props?.element.fields.id,
      field: {
        ActualHours: ActualTime,
        // ActualStartDate: ActualStartDate,
        Status: "Completed",
      },
    };

    await Update(teamsUserCredential, obj);
    await props.setCallReload(true);
    console.log("this is going forward to nifiy");
    await Notifiy(teamsUserCredential, sendNotification);
    props.setOnComplete(false)
  };

  switch (props?.tabName) {
    case "OnGoing":
      if (
        loginuser?.userPrincipalName === props.element.createdBy.user.email &&
        loginuser?.userPrincipalName === props.element.fields.ReviewerMail
      ) {
        check.reviwer = false;
      } else if (
        loginuser?.userPrincipalName === props.element.fields.ReviewerMail
      ) {
        check.reviwer = true;
      }
      check.setTaskButton = true;
      check.setProgressBar = true;
      check.completeBtnVisbile = true;
      check.date = false;

      break;
    case "UpComing":
      check.setEstimateTime = true;
      break;
    case "Completed":
      check.setEstimateTime = true;
      check.setActualTime = true;
      check.ActualStartBtn = true;
      break;
    default:
      break;
  }
  const trimDescription=(str, maxLen, separator = ' ')=>{
      if (str.length <= maxLen) return str;
      return str.substr(0, str.lastIndexOf(separator, maxLen));
  }
  return (
    <div >
      <div className="cardCompo" >
        <Card className={Styles.card} >
          <CardPreview></CardPreview>
          <div >
            <CardHeader
              header={
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%", marginBottom:"5px"}}>
                  <div>
                  <Title3 className={Styles.title}>
                  {props?.element?.fields?.Title}
                  </Title3>
                  </div>
                  <div style={{cursor:"pointer"}} >
                      <Dialog modalType="alert">
                        <DialogTrigger disableButtonEnhancement>
                          <Tooltip     
                                withArrow
                                content="Details"
                                relationship="label"
                              >
                                <Info24Regular/>
                              </Tooltip>
                        </DialogTrigger>
                        <DialogSurface  className="cardCompo">
                          <DialogBody >
                            <DialogTitle weight="bold" action={null}>
                               {props?.element?.fields.Title}
                               <Divider appearance="strong" ></Divider>
                            </DialogTitle>
                            
                            
                            <DialogContent>
                            
                            <div style={{display:"flex",flexDirection:"column",rowGap:"10px"}}>
                            
                                <Text weight="bold">Description: {trimDescription(props?.element?.fields?.Descriptions,50)}</Text>
                                <Text weight="bold">
                                  StartDate : {formateDate(props?.element.fields.StartDate)}
                                </Text>
                                <Text weight="bold">
                                  EndDate : {formateDate(props?.element?.fields.EndDate)}
                                </Text>
                                <Text weight="bold">
                                  Estimated Time : {props?.element?.fields.EstimatedHours}
                                </Text>
                                <Text weight="bold">
                                  Reviwer : {props?.element?.fields.ReviewerDipalyName}
                                </Text>
                              </div>
                            
                            </DialogContent>
                            <DialogActions>
                              <DialogTrigger disableButtonEnhancement>
                                <Button appearance="primary">Close</Button>
                              </DialogTrigger>
                            </DialogActions>
                          </DialogBody>
                        </DialogSurface>
                      </Dialog>
                                      
                  </div>
  
                </div>
                
              }
              description={
                props?.element?.fields?.Descriptions ? 
                 
                      <Body1Strong className={Styles.description}>
                    <div style={{display:"flex",flexDirection:"row"}}>
                      <div> Description :{" "}</div>

                    {props?.element?.fields?.Descriptions.length > 50 ? (
                      
                      <>
                        <div>
                          {trimDescription(props?.element?.fields?.Descriptions,50)}
                        </div>
                      <div>
                        <Dialog
                          className="btnDescription"
                          style={{ display: "flex" }}
                        >
                          <DialogTrigger disableButtonEnhancement>
                            <div style={{ cursor: "pointer", margin: "4px" }}>
                              {" "}
                              <Tooltip
                                withArrow
                                content={props?.element?.fields?.Descriptions}
                                relationship="label"
                              >
                                <MoreHorizontal24Filled />
                              </Tooltip>
                            </div>
                          </DialogTrigger>
                          <DialogSurface className="cardCompo">
                            <DialogBody>
                              <DialogTitle>Task Description</DialogTitle>
                              <DialogContent>
                                <Text weight="bold" size={300}>{props?.element?.fields?.Descriptions}</Text>
                              </DialogContent>
                              <DialogActions>
                                <DialogTrigger disableButtonEnhancement>
                                  <Button appearance="secondary">Close</Button>
                                </DialogTrigger>
                              </DialogActions>
                            </DialogBody>
                          </DialogSurface>
                        </Dialog>
                        </div>
                        </>
                    ) : (
                      props?.element?.fields?.Descriptions
                    )}
                    </div>
                  </Body1Strong>
                  
                      : null  
                  
              }
            />
          </div>

          <CardFooter
            style={{
              justifyContent: "flex-end",
              paddingRight: "20px",
            }}
          >
            <div className="fotterContent" style={{ display: "contents" }}>
              {check.date && (
                <>
                  <Body1Strong className={Styles.cardbodyText}>
                    Start Date :{"  "}
                    <span className="textValue">
                      {formateDate(props?.element?.fields?.StartDate)}
                    </span>
                  </Body1Strong>
                  <Body1Strong className={Styles.cardbodyText}>
                    End Date :{"  "}
                    <span className="textValue">
                      {formateDate(props?.element?.fields?.EndDate)}
                    </span>
                  </Body1Strong>
                </>
              )}
              {check.setEstimateTime && (
                <Body1Strong>
                  Estimated Hour :{"  "}
                  <span className="textValue">
                    {props?.element?.fields?.EstimatedHours}
                  </span>
                </Body1Strong>
              )}
              {check.ActualStartBtn && (
                <Body1Strong>
                  Actual Satrt Date:{" "}
                  <span className="textValue">
                    {formateDate(props?.element?.fields?.ActualStartDate)}
                  </span>
                </Body1Strong>
              )}
              {check.setActualTime && (
                <Body1Strong>
                  Actual Hour :{"  "}
                  <span className="textValue">
                    {props?.element?.fields?.ActualHours}
                  </span>
                </Body1Strong>
              )}
              {check.reviwer ? (
                ""
              ) : (
                <>
                  {load || loader ? (
                    <Spinner></Spinner>
                  ) : (
                    <>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {isPlay &&
                          check.completeBtnVisbile &&
                          (isPlay === "Play" ? (
                            <Tooltip
                            withArrow
                            content="Start"
                            relationship="label"
                            >
                            <PlayCircle24Regular
                              style={{ cursor: "pointer",}}
                              onClick={() => {
                                setLoad(true);
                                setNewPlay(true);
                              }}
                            />
                            </Tooltip>
                          ) : (
                            <Tooltip
                            withArrow
                            content="Stop"
                            relationship="label"
                            >
                            <RecordStop24Regular
                              style={{ cursor: "pointer",}}
                              onClick={() => {
                                setLoad(true);
                                setNewPlay(false);
                              }}
                            />
                            </Tooltip>
                          ))}
                        {check.completeBtnVisbile && (
                          <Tooltip  withArrow
                          content="Complete Task"
                          relationship="label">
                          <Button
                            disabled={isPlay === "Pause"}
                            appearance="primary"
                            onClick={handleCompleteBtn}
                            style={{ marginLeft: "1vw" }}
                          >
                            Completed
                          </Button>
                          </Tooltip>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </CardFooter>
          {check.setProgressBar && (
            <div className="progressBar">
              <Field
                
              >
                <ProgressBar
                  style={{ Color: "yellow" }}
                  className={Styles.container}
                  thickness="large"
                  value={progreessValue}
                  color={ProgressColor()}
                />
                Task ProgressBar
              </Field>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
export default CardComponent;
