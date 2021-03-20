import {combineReducers} from "redux";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    stream: streamReducer,
    auth: authReducer,
    form: formReducer
});