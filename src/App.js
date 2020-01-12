import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import Header from "./components/layout/Header";
//import Footer from "./components/layout/Footer";
import Form from "./components/pages/Form";
import Task from "./components/pages/Task";
const Tasks = lazy(() => import("./components/pages/Tasks"));
//const Task = lazy(() => import('./components/pages/Task'));

const theme = {
  primaryColor: "#009688",
  primaryColorDarker: "#00786c",
  secondaryColor: "#039be5",
  errorColor: "#f50057",
  defaultSpacing: "8px",
  defaultFontSize: "16px",
  backgroundColor: "#f7f7f8",
  highBlack: "rgba(0, 0, 0, 0.87)",
  highLowerBlack: "rgba(0, 0, 0, 0.7)",
  mediumBlack: "rgba(0, 0, 0, 0.6)",
  mediumLowerBlack: "rgba(0, 0, 0, 0.5)",
  lowBlack: "rgba(0, 0, 0, 0.3)",
  lowestBlack: "rgba(0, 0, 0, 0.12)"
};

const GlobalStyle = createGlobalStyle`
   html, body {
      font-family: Roboto;
      font-size: ${theme.defaultFontSize};
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }
   ::selection {
      background: ${theme.primaryColor};
      color: white;
   }
   h3{
      font-size: 1.3rem;
      font-weight: 500;
      margin: 5px 0;
   }
   p{
      font-size: 0.875rem;
      font-weight: 400;
      margin: 0;
      color: ${theme.highLowerBlack};
   }
   textarea, input, button, select { font-family: inherit; font-size: inherit; }
`;

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "700",
                margin: "100px"
              }}
            >
              Loading...
            </div>
          }
        >
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <GlobalStyle />
              <Header />
              <Route exact path="/" component={Form} />
              <Route exact path="/tasks" component={Tasks} />
              <Route exact path="/task" component={Task} />
            </React.Fragment>
          </ThemeProvider>
        </Suspense>
      </Router>
    );
  }
}

export default App;
