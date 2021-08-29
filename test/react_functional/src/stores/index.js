import React from "react";


import { initStore } from "godam-react";
import { Godam, Mutation, Expression } from "godam";

class RootMutation extends Mutation {
    firstName(value) {
        this.state.firstName = value;
    }
    lastName(value) {
        this.state.lastName = value;
    }
}

class RootExpression extends Expression {

    get fullName() {
        return `${this.get('firstName')} ${this.get('lastName')}`
    }

    constructor() {
        super();
        this.markComputed(["firstName", 'lastName'], "fullName");
    }
}

export const store = new Godam({
    state: {
        firstName: 'ujjwal',
        lastName: 'gupta'
    },
    mutations: RootMutation,
    expressions: RootExpression,
    tasks: {
        saveDate(gender) {
            return {
                fullName: this.eval('fullName'),
                gender: gender,
            };
        }
    }
})

initStore(store, React);