import React from "react";
import { AppContext } from "./ContextProvider";

export default Component => props => (
  <AppContext.Consumer>
    {context => <Component {...props} {...{ context }} />}
  </AppContext.Consumer>
);
