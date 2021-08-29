import React from "react";
import { Godam } from "godam";

let _store: Godam;
let _react: React;
export function createState(state: object, comp) {
    const states = {};
    const stateMaps = {};
    for (const key in state) {
        const stateValue = state[key];
        if (typeof stateValue === "function") {
            const mapValue = stateValue();
            const stateKey: string = mapValue.key;
            states[key] = mapValue.state ? _store.get(stateKey) :
                _store.eval(stateKey.replace(/expression./, ''));
            stateMaps[stateKey] = key;
        }
        else {
            states[key] = stateValue;
        }
    }
    const stateSetters = {};
    _store.watch("change", function (key, newValue, oldValue) {
        const localStateKey = stateMaps[key];
        if (localStateKey) {
            if (comp) {
                comp.setState({
                    [localStateKey]: newValue
                })
            }
            else {
                stateSetters[localStateKey](newValue);
            }

        }
    });
    if (comp) {
        comp.state = states;
    }
    else {
        const result = {
            store: _store
        };
        for (const key in states) {
            const stateInstance = _react.useState(states[key]);
            result[key] = stateInstance[0];
            stateSetters[key] = stateInstance[1];
        }
        return result;
    }

}



export function initStore(store: Godam, react: React) {
    _store = store;
    _react = react;
    if (!react) {
        return;
    }
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
        return { state: true, key };
    }
}

export function mapExpression(key: string, room?: string) {
    key = `expression.${key}`;
    if (room) {
        key = key + "@" + room;
    }
    return () => {
        return { exp: true, key };
    }
}