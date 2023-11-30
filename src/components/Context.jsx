import { createContext } from "react";

export const TeamsFxContext = createContext({
  theme: undefined,
  themeString: "",
  teamsUserCredential: undefined,
  loginuser:undefined,
  siteId:undefined,
  listToDoId:undefined,
  listToTaskEntryId:undefined,
  loading: undefined,
  userData: undefined,
  listTimeArry: undefined,
 

});
console.log("Loging the context in context", TeamsFxContext.context);

