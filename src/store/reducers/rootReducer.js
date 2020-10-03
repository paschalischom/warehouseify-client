import uiDataReducer from "./uiDataReducer";
import authReducer from "./authReducer";
import userDataReducer from "./userDataReducer";
import userTempDataReducer from "./userTempDataReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    ui: uiDataReducer,
    auth: authReducer,
    firebase: firebaseReducer,
    user: userDataReducer,
    userTemp: userTempDataReducer
})

export default rootReducer;
