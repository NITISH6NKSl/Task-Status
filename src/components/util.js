import config from "./sample/lib/config";
import { createApiClient } from "@microsoft/teamsfx";
import { BearerTokenAuthProvider } from "@microsoft/teamsfx";

// const callgetDataAPI = async (teamsUserCredential) => {
//   // console.log("Lets check in GetData functiom,", teamsUserCredential);
//   if (!teamsUserCredential) {
//     throw new Error("TeamsFx SDK is not initialized.");
//   }
//   try {
//     const apiBaseUrl = config.apiEndpoint + "/api/";
//     // createApiClient(...) creates an Axios instance which uses BearerTokenAuthProvider to inject token to request header
//     const apiClient = createApiClient(
//       apiBaseUrl,
//       new BearerTokenAuthProvider(
//         async () => (await teamsUserCredential.getToken("")).token
//       )
//     );
//     const response = await apiClient.get("getUser");
//     // console.log("Login the user data--------", response);
//     return response.data;
//   } catch (err) {
//     let funcErrorMsg = "";
//     if (err?.response?.status === 404) {
//       funcErrorMsg = `There may be a problem with the deployment of Azure Function App, please deploy Azure Function (Run command palette "Teams: Deploy") first before running this App`;
//     } else if (err.message === "Network Error") {
//       funcErrorMsg =
//         "Cannot call Azure Function due to network error, please check your network connection status and ";
//       if (err.config.url.indexOf("localhost") >= 0) {
//         funcErrorMsg += `make sure to start Azure Function locally (Run "npm run start" command inside api folder from terminal) first before running this App`;
//       } else {
//         funcErrorMsg += `make sure to provision and deploy Azure Function (Run command palette "Teams: Provision" and "Teams: Deploy") first before running this App`;
//       }
//     } else {
//       funcErrorMsg = err.message;
//       if (err.response?.data?.error) {
//         funcErrorMsg += ": " + err.response.data.error;
//       }
//     }
//     throw new Error(funcErrorMsg);
//   }
// };
const updateApi = async (teamsUserCredential, obj) => {
  // console.log("Lets check in GetData functiom,", teamsUserCredential);

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
    const response = await apiClient.post("fieldSet", obj);
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
};

const AddTaskApi = async (teamsUserCredential, obj) => {
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
    const response = await apiClient.post("addTask", obj);
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
};

const CallPlayPasuseApi = async (teamsUserCredential, obj) => {
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
    const response = await apiClient.post("playPause", obj);
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
};
const CallNotifiyApi = async (teamsUserCredential, sendActivity) => {
  // console.log("We are in call Notify Api", sendActivity);
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
    const response = await apiClient
      .post("GetNotifictaion", sendActivity)
      .then((response) => {
        // console.log("Log reasponse in getNotify", response);
      });
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
};
const CallGetSiteApi = async (teamsUserCredential, sendActivity) => {
  // console.log("We are in call Notify Api", sendActivity);
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
    const response = await apiClient.post("GetSiteList", sendActivity);
    // .then((response) => {
    //   console.log("Log reasponse in GetSite---", response);
    // });

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
};

const CallApiItems = async (teamsUserCredential, sendActivity) => {
  // console.log("We are in call Notify Api", sendActivity);
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
    const response = await apiClient.post("GetItemsCall", sendActivity);
    console.log("This is a response in a data in util ", response);

    return response.data.graphClientMessage;
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
};
const callProfileApi = async (teamsUserCredential) => {
  // console.log("We are in call Notify Api", sendActivity);
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
    const response = await apiClient.get("userProfile");
    console.log("This is a response in a data in util ", response);

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
};
// const GetUser = async (teamsUserCredential, sendActivity) => {
//   try {
//     const functionRes = await CallUserLookupApi(
//       teamsUserCredential,
//       sendActivity
//     );
//     // console.log("login user data site", functionRes);
//     return functionRes;
//   } catch (error) {
//     if (error.message.includes("The application may not be authorized.")) {
//     }
//   }
// };
const Notifiy = async (teamsUserCredential, sendActivity) => {
  try {
    const functionRes = await CallNotifiyApi(teamsUserCredential, sendActivity);
    // console.log("login user data site", functionRes);
    return functionRes;
  } catch (error) {
    if (error.message.includes("The application may not be authorized.")) {
    }
  }
};
const GetItems = async (teamsUserCredential, Obj) => {
  try {
    const functionRes = await CallApiItems(teamsUserCredential, Obj);
    // console.log("login user data site", functionRes);
    return functionRes;
  } catch (error) {
    if (error.message.includes("The application may not be authorized.")) {
    }
  }
};
const Update = async (teamsUserCredential, obj) => {
  try {
    const functionRes = await updateApi(teamsUserCredential, obj);

    return functionRes;
  } catch (error) {
    if (error.message.includes("The application may not be authorized.")) {
    }
  }
};

const addTasklist = async (teamsUserCredential, obj) => {
  try {
    const functionRes = await AddTaskApi(teamsUserCredential, obj);

    return functionRes;
  } catch (error) {
    if (error.message.includes("The application may not be authorized.")) {
    }
  }
};
const playPause = async (teamsUserCredential, obj) => {
  try {
    const functionRes = await CallPlayPasuseApi(teamsUserCredential, obj);

    return functionRes;
  } catch (error) {
    if (error.message.includes("The application may not be authorized.")) {
    }
  }
};
const GetSite = async (teamsUserCredential, sendActivity) => {
  try {
    const functionRes = await CallGetSiteApi(teamsUserCredential, sendActivity);
    // console.log("login user data site", functionRes);
    return functionRes;
  } catch (error) {
    if (error.message.includes("The application may not be authorized.")) {
    }
  }
};
const getprofile = async (teamsUserCredential) => {
  try {
    const functionRes = await callProfileApi(teamsUserCredential);
    console.log("login user pofile _____", functionRes);
    return functionRes;
  } catch (error) {
    if (error.message.includes("The application may not be authorized.")) {
    }
  }
};
// async function callFunction(teamsUserCredential) {
//   // const tokenAccess = (await teamsUserCredential.getToken(""))
//   // console.log("e trying to fin Access in tab", tokenAccess)
//   // sessionStorage.setItem("accessToken",`"${tokenAccess}"`)
//   if (!teamsUserCredential) {
//     throw new Error("TeamsFx SDK is not initialized.");
//   }
//   try {
//     const apiBaseUrl = config.apiEndpoint + "/api/";
//     // createApiClient(...) creates an Axios instance which uses BearerTokenAuthProvider to inject token to request header
//     const apiClient = createApiClient(
//       apiBaseUrl,
//       new BearerTokenAuthProvider(
//         async () => (await teamsUserCredential.getToken("")).token
//       )
//     );
//     const listId = { listid: "b01093fb-5190-4e91-8c3a-aa3d74c400a9" };
//     const response = await apiClient.post("getData", listId);
//     // console.log("response Data is  in tabApp",response.data);

//     return response.data;
//   } catch (err) {
//     let funcErrorMsg = "";
//     if (err?.response?.status === 404) {
//       funcErrorMsg = `There may be a problem with the deployment of Azure Function App, please deploy Azure Function (Run command palette "Teams: Deploy") first before running this App`;
//     } else if (err.message === "Network Error") {
//       funcErrorMsg =
//         "Cannot call Azure Function due to network error, please check your network connection status and ";
//       if (err.config.url.indexOf("localhost") >= 0) {
//         funcErrorMsg += `make sure to start Azure Function locally (Run "npm run start" command inside api folder from terminal) first before running this App`;
//       } else {
//         funcErrorMsg += `make sure to provision and deploy Azure Function (Run command palette "Teams: Provision" and "Teams: Deploy") first before running this App`;
//       }
//     } else {
//       funcErrorMsg = err.message;
//       if (err.response?.data?.error) {
//         funcErrorMsg += ": " + err.response.data.error;
//       }
//     }
//     throw new Error(funcErrorMsg);
//   }
// }
export { Update, addTasklist, playPause, Notifiy, GetSite, GetItems,getprofile };
