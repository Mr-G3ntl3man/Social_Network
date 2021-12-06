import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer} from "./reducer/profile-reducer";
import {dialogReducer} from "./reducer/dialog-reducer";
import {usersReducer} from "./reducer/users-reducer";
import {authReducer} from "./reducer/auth-reducer";
import thunk from 'redux-thunk'
import {appReducer} from "./reducer/app-reducer";

const rootReducer = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogReducer,
   usersPage: usersReducer,
   auth: authReducer,
   app: appReducer
})

export type AppRootStateT = ReturnType<typeof rootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
