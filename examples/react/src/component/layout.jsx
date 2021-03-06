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

    submit() {
        console.log(this.store.do("saveDate", this.state.gender));
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
                <div className="mt-20px">
                    <button onClick={this.submit.bind(this)}>Submit</button>
                </div>
            </div>
        )
    }
}