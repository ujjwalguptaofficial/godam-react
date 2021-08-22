import React from "react";
import { mapState, createState, mapExpression } from "godam-react";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.createState({
            firstName: mapState('firstName'),
            lastName: mapState('lastName'),
            gender: 'male',
            fullName: mapExpression('fullName')
        });
    }

    onFirstNameChange(e) {
        this.store.set("firstName", e.target.value);
    }

    onLastNameChange(e) {
        this.store.set("lastName", e.target.value);
    }

    onGenderChange(e) {
        this.setState({ "gender": e.target.value })
    }

    submit() {
        console.log(this.store.do("saveDate", this.state.gender));
    }

    render() {
        return (
            <div class="col content-center">
                <div class="row mt-10px">
                    <div>
                        Full Name:
                    </div>
                    <div class="ml-10px">
                        {this.state.fullName}
                    </div>
                </div>
                <div class="row mt-10px">
                    <div>
                        First Name:
                    </div>
                    <input type="text" value={this.state.firstName} onInput={this.onFirstNameChange.bind(this)} />
                </div>
                <div class="row mt-10px">
                    <div>
                        Last Name:
                    </div>
                    <input type="text" value={this.state.lastName} onInput={this.onLastNameChange.bind(this)} />
                </div>
                <div class="row mt-10px">
                    <div>
                        Gender:
                    </div>
                    <input type="text" value={this.state.gender} onInput={this.onGenderChange.bind(this)} />
                </div>
                <div class="mt-20px">
                    <button onClick={this.submit.bind(this)}>Submit</button>
                </div>
            </div>
        )
    }
}