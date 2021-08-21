import React from "react";
import ReactDOM from "react-dom";
import Layout from "./component/layout";

import { initStore } from "godam-react";
import { Godam, Mutation, Expression, Computed } from "godam";

class RootMutation extends Mutation {
    name(value) {
        this.state.name = value;
    }
}

class RootExpression extends Expression {

    get about() {
        return `Hello my name is ${this.get('name')}`
    }

    constructor() {
        super();
        this.markComputed(["name"], "about");
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