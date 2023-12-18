// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Spinner,
  tokens,
} from "@fluentui/react-components";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";

import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab1 from "./MainTab";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";




/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function  App() {
  // const [needConsent, setNeedConsent] = useState(false);
  // const [siteId,setSiteId ] = useState("");
  // const [listToDoId,setListToDo]=useState("")
  // const [listToTaskEntryId,setListToDoTaskEntry]=useState("")
  const { loading, theme, themeString, teamsUserCredential, } =
    useTeamsUserCredential({
      initiateLoginEndpoint: config.initiateLoginEndpoint,
      clientId: config.clientId,
    });

  // useEffect(() => {
  //   getSiteList(teamsUserCredential,);
    
  // }, [teamsUserCredential]);
  // const getSiteList= async(teamsUserCredential)=>{
  //   const obj={siteName:"Teams_Site",listTodo:"ToDoTask",listTaskEntry:"To Do Task Entry"}
  //    const res= await GetSite(teamsUserCredential,obj)
  //    setSiteId(res?.graphClientMessage?.value[0]?.sharepointIds.siteId)
  //    setListToDo(res?.listIdToDo?.id)
  //    setListToDoTaskEntry(res?.listIdToDoEntry?.id)
  //     console.log("This is Response in app of site",res);
    

  // }
  // const { data, reload } = useData(async () => {
  //   if (!teamsUserCredential) {
  //     throw new Error("TeamsFx SDK is not initialized.");
  //   }
  //   if (needConsent) {
  //     await teamsUserCredential.login(["User.Read"]);
  //     setNeedConsent(false);
  //   }
  //   console.log("trying in usedata", teamsUserCredential);
  //   try {
  //     const functionRes = await GetData(teamsUserCredential);
  //     console.log("Response in dtazzy")
  //     return functionRes;
  //   } catch (error) {
  //     if (error.message.includes("The application may not be authorized.")) {
  //       setNeedConsent(true);
  //     }
  //   }
  // });

  return (
    <TeamsFxContext.Provider
      value={{ theme, themeString, teamsUserCredential, }}
    >
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Router>
          {loading ? (
            <Spinner style={{ margin: 100 }} />
          ) : (
            <Routes>
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} />
              <Route path="/tab" element={<Tab1  />} />
              <Route path="*" element={<Navigate to={"/tab"} />}></Route>
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
