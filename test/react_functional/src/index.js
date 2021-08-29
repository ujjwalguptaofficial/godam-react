import React from "react";
import ReactDOM from "react-dom";
import Layout from "./component/layout";
import "./stores";

console.log("Layout", Layout);
var Comp = Layout.bind({});
const app = document.getElementById('app');
ReactDOM.render(<Comp />, app);