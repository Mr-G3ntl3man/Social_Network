import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./reducer/profile-reducer";
import {dialogReducer} from "./reducer/dialog-reducer";
import {usersReducer} from "./reducer/users-reducer";
import {authReducer} from "./reducer/auth-reducer";
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogReducer,
   usersPage: usersReducer,
   auth: authReducer
})

export type AppStateType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store