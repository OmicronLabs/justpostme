import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import WelcomeBulma from "./Welcome-styled";

ReactDOM.render(<WelcomeBulma />, document.getElementById("root"));
registerServiceWorker();
