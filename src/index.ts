import React from "react";
import { Godam } from "godam";

export function createState(state: object, comp) {
    const states = {};
    if (!comp.__stateMaps__) {
        comp.__stateMaps__ = {};
    }
    for (const key in state) {
        const stateValue = state[key];
        if (typeof stateValue === "function") {
            const stateKey = stateValue();
            states[key] = comp.store.get(stateKey);

            comp.__stateMaps__[stateKey] = key;
        }
        else {
            states[key] = stateValue;
        }
    }
    comp.state = states;
    comp.store.watch("change", function (key, newValue, oldValue) {
        const localStateKey = comp.__stateMaps__[key];
        if (localStateKey) {
            comp.setState({
                [localStateKey]: newValue
            })
        }
    });
}



export function initStore(store: Godam, react: React) {
    react.Component.prototype.createState = function (state: object) {
        createState(state, this);
    }
    react.Component.prototype.store = store;
}

export function mapState(key: string, room?: string) {
    if (room) {
        key = key + "@" + room;
    }
    return () => {
        return key;
    }
}