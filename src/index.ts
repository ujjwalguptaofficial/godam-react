import React from "react";
import { Godam } from "godam";

React.Component.prototype.createState = function (state: object) {
    const states = {};
    if (!this.__stateMaps__) {
        this.__stateMaps__ = {};
    }
    for (const key in state) {
        const stateValue = state[key];
        if (typeof stateValue === "function") {
            const stateKey = stateValue();
            states[key] = this.store.get(stateKey);

            this.__stateMaps__[stateKey] = key;
        }
        else {
            states[key] = stateValue;
        }
    }
    this.state = states;
    this.store.watch("change", function (key, newValue, oldValue) {
        const localStateKey = this.__stateMaps__[key];
        if (localStateKey) {
            this.setState({
                [localStateKey]: newValue
            })
        }
    });
}

export function initStore(store: Godam) {
    React.Component.prototype.store = store;
}

export function mapState(key: string, room?: string) {
    if (room) {
        key = key + "@" + room;
    }
    return () => {
        return key;
    }
}