import React from "react";
import ReactDOM from "react-dom";
import Layout from "./component/layout";

import { initStore } from "godam-react";
import { Godam, Mutations } from "godam";

class RootMutation extends Mutations {
    name(value) {
        this.state.name = value;
    }
}

const store = new Godam({
    state: {
        name: 'ujjwal gupta'
    },
    mutations: RootMutation
})

initStore(store, React);

const app = document.getElementById('app');
ReactDOM.render(<Layout />, app);