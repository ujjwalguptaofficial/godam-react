import React, { useState } from "react";
import { mapState, createState, mapExpression } from "godam-react";
import { store } from "../stores";

export default function component() {
    createState({
        firstName: mapState('firstName')
    }, component)
    const [gender, setGender] = useState('gender');

    const onFirstNameChange = (e) => {
        store.set('firstName', e.target.value);
    }
    const onLastNameChange = (e) => {
        store.set('lastName', e.target.value);
    }
    const submit = (e) => {
        // store.set()
    }
    return (
        <div className="col content-center">
            <div className="row mt-10px">
                <div>
                    Full Name:
                    </div>
                <div className="ml-10px">
                    {store.eval('fullName')}
                </div>
            </div>
            <div className="row mt-10px">
                <div>
                    First Name:
                    </div>
                <input type="text" value={store.get('firstName')} onInput={onFirstNameChange} />
            </div>
            <div className="row mt-10px">
                <div>
                    Last Name:
                    </div>
                <input type="text" value={store.get('lastName')} onInput={onLastNameChange} />
            </div>
            <div className="row mt-10px">
                <div>
                    Gender:
                    </div>
                <input type="text" value={gender} onInput={setGender} />
            </div>
            <div className="mt-20px">
                <button onClick={submit}>Submit</button>
            </div>
        </div>
    )
}