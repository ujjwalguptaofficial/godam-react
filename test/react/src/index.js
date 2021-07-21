import React from "react";
import ReactDOM from "react-dom";
import Layout from "./component/layout";

import { initStore } from "godam-react";
import { Godam, Mutations, Expressions, Computed } from "godam";

class RootMutation extends Mutations {
    name(value) {
        this.state.name = value;
    }
}

class RootExpression extends Expressions {

    @Computed('name')
    about() {
        return `Hello my name is ${this.get('name')}`
    }
}

const store = new Godam({
    state: {
        name: 'ujjwal gupta'
    },
    mutations: RootMutation,
    expressions: RootExpression
})

initStore(store, React);

const app = document.getElementById('app');
ReactDOM.render(<Layout />, app);