import {combineReducers} from 'redux';
import getEmailID from "./getemail";

const allReducers = combineReducers({
    email:getEmailID,
});

export default allReducers;