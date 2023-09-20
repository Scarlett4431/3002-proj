import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';

import { verifyAuth } from "./actions/";
import rootReducer from "./reducers";

const composeEnhancers = composeWithDevTools({
    realtime: true,
    name: 'test',
    hostname: 'localhost',
    port: 3000 // the port your remotedev server is running at
  })

export default function configureStore(persistedState) {
    const store = createStore(
        rootReducer,
        persistedState,
        composeEnhancers(
            applyMiddleware(thunkMiddleware)
            // other store enhancers if any
        )
    );

    // to check whether the saved account info is correct
    console.log("Verify Store");
    store.dispatch(verifyAuth());
    return store;
}