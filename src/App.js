import React from "react";

//import Scss
import "./assets/scss/themes.scss";

//imoprt Route
import Route from "./Routes";
import ErrorBoundary from "../src/pages/Errors/ErrorBoundary"
const route = <Route />
function App() {
  return (
    <ErrorBoundary fallback={route}>
      <React.Fragment>
        <Route />
      </React.Fragment>
    </ErrorBoundary>
  );
}

export default App;
