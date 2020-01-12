import React, { Component } from "react";

// first make a new context
export const AppContext = React.createContext();

// Then create a provider Component
export class ContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      isMobile: false
    };
  }

  componentDidMount() {
    if (window.innerWidth < 1000) {
      this.setState({ isMobile: true });
    }
    this.updateWindowDimensions(true)();
    window.addEventListener("resize", this.updateWindowDimensions(false));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isMobile === this.state.isMobile) {
      return false;
    }
    return true;
  }

  updateWindowDimensions = first => deets => {
    if (!first) {
      if (
        /iPhone|Android/i.test(navigator.userAgent) ||
        deets.currentTarget.innerWidth < 1000
      ) {
        this.setState({ isMobile: true });
      } else {
        this.setState({ isMobile: false });
      }
    } else {
      if (/iPhone|Android/i.test(navigator.userAgent)) {
        this.setState({ isMobile: true });
      }
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
