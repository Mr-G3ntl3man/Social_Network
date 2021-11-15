import {Dispatch} from "redux";
import {getUserData} from "./auth-reducer";

export enum ACTION_TYPE_APP {
   SUCCESSFUL_INITIALIZATION = 'SUCCESSFUL_INITIALIZATION'
}


export type AppStateType = {
   initialized: boolean
}

type ActionType = ReturnType<typeof setInitialized>

const initialState: AppStateType = {
   initialized: false
}

export const appReducer = (state = initialState, action: ActionType): AppStateType => {
   switch (action.type) {
      case ACTION_TYPE_APP.SUCCESSFUL_INITIALIZATION:
         return {...state, initialized: true}

      default:
         return {...state}
   }
}

const setInitialized = () => ({type: ACTION_TYPE_APP.SUCCESSFUL_INITIALIZATION} as const)

export const initializedApp = (): (dispatch: Dispatch | any) => void => (dispatch) => {

   Promise.all([
      dispatch(getUserData())
   ]).then(() => dispatch(setInitialized()))

}
