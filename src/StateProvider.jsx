import React, {createContext, useContext, useReducer} from 'react';

// Prepares the data layer
export const StateContext = createContext();

// Wrap the app and provide the data layer
export const StateProvider = ({reducer, initial_state, children}) => (

    <StateContext.Provider value={useReducer(reducer, initial_state)}>
        {children}
    </StateContext.Provider>
);

// Pull information from the data layer
export const UseStateValue = () => useContext(StateContext);
