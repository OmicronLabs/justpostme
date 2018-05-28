import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Welcome from "./components/WelcomePage";

ReactDOM.render(<Welcome />, document.getElementById("root"));
registerServiceWorker();
