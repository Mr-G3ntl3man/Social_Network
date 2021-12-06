import {Action, Dispatch} from "redux";
import {getUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppRootStateT} from "../redux-store";

export enum ACTION_TYPE_APP {
   SUCCESSFUL_INITIALIZATION = 'social_network/app/SUCCESSFUL_INITIALIZATION',
   CATCH_ERROR = 'social_network/app/CATCH_ERROR',
}

export type SeverityTooltipType = "error" | "warning" | "info" | "success"

export type AppStateType = {
   initialized: boolean
   catchError: {
      error: boolean
      messageError: string | null
      severity: SeverityTooltipType
   }
}

type ActionType = ReturnType<typeof setInitialized> | ReturnType<typeof catchError>

type ThunkActionT = ThunkAction<void, AppRootStateT, unknown, ActionType>

const initialState: AppStateType = {
   initialized: false,
   catchError: {
      error: false,
      messageError: null,
      severity: 'info'
   }
}

export const appReducer = (state = initialState, action: ActionType): AppStateType => {
   switch (action.type) {
      case ACTION_TYPE_APP.SUCCESSFUL_INITIALIZATION:
         return {...state, initialized: true}

      case ACTION_TYPE_APP.CATCH_ERROR:
         return {
            ...state,
            catchError: {
               error: true,
               messageError: action.message,
               severity: action.severity
            }
         }

      default:
         return state
   }
}

const setInitialized = () => ({type: ACTION_TYPE_APP.SUCCESSFUL_INITIALIZATION} as const)
const catchError = (message: string | null, severity: SeverityTooltipType) => ({
   type: ACTION_TYPE_APP.CATCH_ERROR,
   message,
   severity
} as const)

export const initializedApp = (): ThunkActionT =>
   (dispatch) => {
      Promise.all([
         dispatch(getUserData())
      ]).then(() => dispatch(setInitialized()))
   }

export const installCaughtError = (message: string, severity: SeverityTooltipType) => (dispatch: Dispatch<ActionType>) => {
   dispatch(catchError(message, severity))

   setTimeout(() => dispatch(catchError(null, "info")), 2000)
}
