import * as React from "react";
import * as ReactDOM from "react-dom";
import "./css/style.css";

const renderApp = () => {
	ReactDOM.render(<div>Hello From MyApp1</div>, document.getElementById("app"));
};

renderApp();
