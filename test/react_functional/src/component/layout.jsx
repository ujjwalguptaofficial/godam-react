import React, { useState } from "react";
import { mapState, createState, mapExpression } from "godam-react";

export default function component() {
    const { firstName, lastName, fullName, store } = createState({
        firstName: mapState('firstName'),
        lastName: mapState('lastName'),
        fullName: mapExpression('fullName')
    })
    const [gender, setGender] = useState('gender');

    const onFirstNameChange = (e) => {
        store.set('firstName', e.target.value);
    }
    const onLastNameChange = (e) => {
        store.set('lastName', e.target.value);
    }
    const onGenderChange = (e) => {
        setGender(e.target.value);
    }
    const submit = (e) => {
        console.log(store.do("saveDate", gender));

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
            <div className="mt-20px">
                <button onClick={submit}>Submit</button>
            </div>
        </div>
    )
}