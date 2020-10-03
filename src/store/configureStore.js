import { createStore }  from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import rootReducer from "./reducers/rootReducer";
import {applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {getFirebase} from "react-redux-firebase";
import {getFirestore, reduxFirestore} from "redux-firestore";
import fbConfig from "../config/fbConfig";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
    stateReconciler: autoMergeLevel1
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    // TODO: Remove composeEnhancers in production build with simply a 'compose'
    //       It just instantiates the redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(persistedReducer,
        composeEnhancers(
            applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
            reduxFirestore(fbConfig),
        )
    );
    const persistor = persistStore(store);
    return { store, persistor }
}
