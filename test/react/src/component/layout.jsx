import React from "react";
import { mapState, createState, mapExpression } from "godam-react";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.createState({
            name: mapState('name'),
            gender: 'male',
            about: mapExpression('about')

        });
        // this.state = {
        //     name: 'dd'
        // }
    }

    onNameChange(e) {
        this.store.set("name", e.target.value);
    }

    onGenderChange(e) {
        this.setState({ "gender": e.target.value })
    }

    render() {
        return (
            <div>
                <p>
                    Name:
                    <input type="text" value={this.state.name} onInput={this.onNameChange.bind(this)} />
                    {this.state.name}
                </p>
                <p>
                    Gender:
                    <input type="text" value={this.state.gender} onInput={this.onGenderChange.bind(this)} />
                    {this.state.gender}
                </p>
                <p>About myself:
                    {this.state.about}
                </p>
            </div>
        )
    }
}