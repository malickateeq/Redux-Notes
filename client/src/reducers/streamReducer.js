
import { CREATE_STREAM, FETCH_STREAMS, EDIT_STREAM, FETCH_STREAM, DELETE_STREAM } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => 
{
    switch(action.type)
    {
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };   // From API and append in state
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };   // Create new and append in state
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };   // Got signle record from API and append
        case EDIT_STREAM:
            // const newState = {...state, };
            // newState[payload.action.id] = action.payload;
            // return newState;

            // OR ES6 Shortcut: Key interpolation
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload);   // In payload action is returning id only so NO payload.id
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };    // mapKeys on all records from action.payload and inject/replace or merge
        default:
            return state;
    }
}