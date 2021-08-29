import React from "react";
import ReactDOM from "react-dom";
import Layout from "./component/layout";
import { initStore } from "godam-react";
import { store } from "./stores";

initStore(store, React);

const app = document.getElementById('app');
ReactDOM.render(<Layout />, app);