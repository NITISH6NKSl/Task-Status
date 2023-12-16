import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
  Dropdown,
  Option,
  Persona,
  Spinner,
} from "@fluentui/react-components";

import { ClipboardTaskAdd24Filled } from "@fluentui/react-icons";
import { addYears } from "@fluentui/react-calendar-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { useContext, useState } from "react";
import { TeamsFxContext } from "./Context";
import { addTasklist,Notifiy } from "./util";
import  config from "./sample/lib/config"


const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
});
const AddTask = (props) => {
  const { teamsUserCredential, userData, listToDoId, siteId } =
    useContext(TeamsFxContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [descripiton, setDiscription] = useState("");
  const [EstimatedHours, setEstimatedHours] = useState("");
  const [StartDate, setsatrtDate] = useState("");
  const [EndDate, setEnddate] = useState("");
  const [isButtonDiabled, setButtonDisabled] = useState(true);
  const [ReviwerDisplayName, setReviwerDisplayName] = useState("");
  const [ReviewerEmail, setReviewerEmail] = useState();
  const [addTaskLoad, setAddTaskLoad] = useState(false);
  const [ReviewerUserId, setReviewerId] = useState("");

  const styles = useStyles();

  const sendNotification = {
    siteId: siteId,
    reviewerUserId:ReviewerUserId ,
    sendActivityNotification: {
      topic: {
        source: "text",
        value: "Task Completed",
        webUrl: `https://teams.microsoft.com/l/entity/${config.teamsAppId}/index`,
      },
      activityType: "taskAdded",
      previewText: {
        content: `You Are Added as Rewier for Task ${taskTitle} By ${props?.userName} `,
      },
      templateParameters: [
        // {
        //   name: "taskId",
        //   value: (props?.element?.fields?.id).toString(),
        // },
        {
          name: "taskName",
          value: taskTitle.toString(),
        },
      ],
    },
    sendMail: {
      message: {
        subject: `${taskTitle} - Task Assined To You`,
        body: {
          contentType: "Text",
          content: `${taskTitle} " Task is Added By " ${props?.userName}
           Start Date: ${StartDate}
           End Date: ${EndDate}
           Estimated Hours: ${EstimatedHours}
           `,
        },
        toRecipients: [
          {
            emailAddress: {
              address:ReviewerEmail,
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
  };
  // Initialize teams app
  // let context;
  // app.initialize().then(async () => {
  //   // Get our frameContext from context of our app in Teams
  //   context = await app.getContext();
  //   // console.log("Loging the context", context);
  //   // console.log("firstkese ho", context);
  //   // setTeamsPageType(context?.page.frameContext);
  //   /* if (context.page.frameContext == "meetingStage") {
  //     view = "stage";
  //   }
  //   const theme = context.app.theme;
  //   if (theme == "default") {
  //     color = "black";
  //   }
  //   app.registerOnThemeChangeHandler(function (theme) {
  //     color = theme === "default" ? "black" : "white";
  //   }); */
  // });
  console.log("This is a list id in add task", listToDoId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const userLookup = await GetUser(teamsUserCredential, Reviewer);
    // console.log("This is user lookup", userLookup);
    setAddTaskLoad(true);
    const obj = {
      listId: listToDoId,
      siteId: siteId,
      field: {
        StartDate: StartDate,
        EndDate: EndDate,
        Title: taskTitle,
        IsPlay: "Play",
        EstimatedHours: EstimatedHours,
        // ReviwerLookupId: userLookup?.toString(),
        ReviewerDipalyName: ReviwerDisplayName,
        // ReviewerId: userLookup?.toString(),
        ReviewerId: ReviewerUserId,
        Status: "UpComing",
        Descriptions: descripiton,
        ReviewerMail: ReviewerEmail,
      },
    };
    // console.log("submit Trigred");
    // console.log(
    //   "Loging all data ",
    //   StartDate,
    //   EndDate,
    //   descripiton,
    //   Reviewer,
    //   taskTitle,
    //   EstimatedHours
    // );
    await addTasklist(teamsUserCredential, obj);
    props?.setCallReload(true);
    await Notifiy(teamsUserCredential,sendNotification)
  };
  const today = new Date();
  // const minDate = addMonths(today, new Date());
  const maxDate = addYears(today, 1);

  const onFormatDate = (date) => {
    return !date
      ? ""
      : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const ClearState = (e) => {
    // e.preventDefault();
    setTaskTitle("");
    setDiscription("");
    setEstimatedHours("");
    setsatrtDate("");
    setEnddate("");
    setButtonDisabled(true);
    setReviwerDisplayName("");
    setReviewerEmail("");
  };
  // people
  //   .selectPeople({
  //     setSelected: ["aad id"],
  //     openOrgWideSearchInChatOrChannel: true,
  //     singleSelect: false,
  //     title: true,
  //   })
  //   .then((people) => {
  //     console.log(
  //       " People length: " + people.length + " " + JSON.stringify(people)
  //     );
  //   })
  // .catch((error) => {
  //   /*Unsuccessful operation*/
  // });
  return (
    <div className="dialog_form">
      <Dialog modalType="alert">
        <DialogTrigger disableButtonEnhancement>
          <Button
            appearance="primary"
            icon={<ClipboardTaskAdd24Filled />}
            // onClick={(e) => {
            //   getUserData(e, teamsUserCredential);
            // }}
          >
            Add Task
          </Button>
        </DialogTrigger>

        <DialogSurface aria-describedby={undefined}>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {addTaskLoad ? (
              <Spinner label="Adding New Task" labelPosition="below"></Spinner>
            ) : (
              <>
                <DialogBody>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogContent className={styles.content}>
                    <Label required htmlFor={"Task_title"}>
                      Task Title
                    </Label>
                    <Input
                      required
                      type="text"
                      id={"Task_title"}
                      onChange={(e) => {
                        if (e.target?.value?.length < 35) {
                          setTaskTitle(e.target.value);
                        }
                      }}
                      value={taskTitle}
                      placeholder="Enter a Task Title"
                    />
                    <Label required htmlFor={"descripition"}>
                      Descriptions
                    </Label>
                    <Input
                      required
                      type="text"
                      id={"description"}
                      onChange={(e) => {
                        if (e.target?.value?.length < 225) {
                          setDiscription(e.target.value);
                        }
                      }}
                      value={descripiton}
                      placeholder="Enter a Task Descriptions"
                    />

                    <Label required htmlFor={"dateTime"}>
                      Start Date Time
                    </Label>
                    <DatePicker
                      required
                      minDate={new Date()}
                      maxDate={maxDate}
                      placeholder="Select a date..."
                      formatDate={onFormatDate}
                      value={StartDate}
                      onSelectDate={setsatrtDate}
                      allowTextInput
                      className={styles.inputControl}
                    />
                    <Label required htmlFor={"EndDateTime"}>
                      End Date Time
                    </Label>
                    <DatePicker
                      required
                      minDate={StartDate}
                      maxDate={maxDate}
                      placeholder="Select a date..."
                      formatDate={onFormatDate}
                      allowTextInput
                      className={styles.inputControl}
                      value={EndDate}
                      onSelectDate={setEnddate}
                    />
                    <label required htmlFor={"EstimatedHour"}>
                      Estimated Hours <span style={{ color: "red" }}> *</span>
                    </label>
                    <Input
                      required
                      type="Number"
                      id={"EstimatedHour"}
                      onChange={(e) => {
                        if (e.target?.value < 100) {
                          setEstimatedHours(e.target.value);
                        }
                      }}
                      value={EstimatedHours}
                      placeholder="Enter a Estimated Hour in Number"
                    />

                    <label required htmlFor="Reviwer">
                      Reviwer <span style={{ color: "red" }}> *</span>
                    </label>
                    <Dropdown
                      required
                      id={"Reviwer"}
                      aria-labelledby="Reviwer"
                      onOptionSelect={(e, data) => {
                       
                        setReviewerEmail(data?.optionValue?.userPrincipalName);
                        setReviwerDisplayName(data?.optionText);
                        setReviewerId(data?.optionValue?.id);
                        

                        setButtonDisabled(false);
                      }}
                      placeholder="Select Reviwer"
                    >
                      {userData?.map((userData) => {
                        return (
                          <Option
                            required
                            text={userData.displayName}
                            key={userData.id}
                            // id={userData.id}
                            value={userData}
                          >
                            <Persona
                              required
                              avatar={{
                                color: "colorful",
                                "aria-hidden": true,
                              }}
                              name={userData.displayName}
                              presence={{
                                status: "available",
                              }}
                              secondaryText="Available"
                            />
                          </Option>
                        );
                      })}
                    </Dropdown>
                  </DialogContent>
                  <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                      <Button appearance="secondary" onClick={ClearState}>
                        Close
                      </Button>
                    </DialogTrigger>
                    <Button
                      type="submit"
                      appearance="primary"
                      //   onSubmit={handleSubmit}
                      disabled={isButtonDiabled}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </DialogBody>
              </>
            )}
          </form>
        </DialogSurface>
      </Dialog>
    </div>
  );
};
export default AddTask;
