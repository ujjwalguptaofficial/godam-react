# godam-react

Godam plugin for react framework.

# Installation

```
npm i godam-react
```

# Guide

## Using class based component

### Setup store

```
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

const store = new Godam({
    state: {
        firstName: 'ujjwal',
        lastName: 'gupta'
    },
    mutations: RootMutation,
    expressions: RootExpression
})

initStore(store, React);
```

### Using in component

```
import React from "react";
import { mapState, createState, mapExpression, mapMutation } from "godam-react";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.createState({
            firstName: mapState('firstName'),
            lastName: mapState('lastName'),
            gender: 'male',
            fullName: mapExpression('fullName')
        });
        
        this.createMethod({
            setFirstName: mapMutation("firstName")
        })
    }

    onFirstNameChange(e) {
        this.setFirstName(e.target.value);
    }

    onLastNameChange(e) {
        this.store.set("lastName", e.target.value);
    }

    onGenderChange(e) {
        this.setState({ "gender": e.target.value })
    }

    render() {
        return (
            <div className="col content-center">
                <div className="row mt-10px">
                    <div>
                        Full Name:
                    </div>
                    <div className="ml-10px">
                        {this.state.fullName}
                    </div>
                </div>
                <div className="row mt-10px">
                    <div>
                        First Name:
                    </div>
                    <input type="text" value={this.state.firstName} onInput={this.onFirstNameChange.bind(this)} />
                </div>
                <div className="row mt-10px">
                    <div>
                        Last Name:
                    </div>
                    <input type="text" value={this.state.lastName} onInput={this.onLastNameChange.bind(this)} />
                </div>
                <div className="row mt-10px">
                    <div>
                        Gender:
                    </div>
                    <input type="text" value={this.state.gender} onInput={this.onGenderChange.bind(this)} />
                </div>
            </div>
        )
    }
}
```

## Functional component

### Setup store

```
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
    expressions: RootExpression
})

initStore(store, React);
```

### Using in component

```
import React, { useState } from "react";
import { mapState, createState, mapExpression, createMethod, mapMutation } from "godam-react";

export default function () {
    const { firstName, lastName, fullName, store } = createState({
        firstName: mapState('firstName'),
        lastName: mapState('lastName'),
        fullName: mapExpression('fullName')
    })
    
    const { setFirstName } = createMethod({
        setFirstName: mapMutation('firstName')
    });

    const [gender, setGender] = useState('gender');

    const onFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const onLastNameChange = (e) => {
        store.set('lastName', e.target.value);
    }

    const onGenderChange = (e) => {
        setGender(e.target.value);
    }

    return (
        <div className="col content-center">
            <div className="row mt-10px">
                <div>
                    Full Name:
                    </div>
                <div className="ml-10px">
                    {fullName}
                </div>
            </div>
            <div className="row mt-10px">
                <div>
                    First Name:
                    </div>
                <input type="text" value={firstName} onInput={onFirstNameChange} />
            </div>
            <div className="row mt-10px">
                <div>
                    Last Name:
                    </div>
                <input type="text" value={lastName} onInput={onLastNameChange} />
            </div>
            <div className="row mt-10px">
                <div>
                    Gender:
                    </div>
                <input type="text" value={gender} onInput={onGenderChange} />
            </div>
        </div>
    )
}
```