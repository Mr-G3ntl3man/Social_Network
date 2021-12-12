import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppRootStateT} from "../redux-store";
import {chatApi, ChatMessageApiT} from "../../api/chat-api";
import {v1} from "uuid";

export enum ACTION_TYPE_CHAT {
   MESSAGES_RECEIVED = 'social_network/chat/MESSAGES_RECEIVED',
   STATUS_CHANGED = 'social_network/chat/STATUS_CHANGED'
}

export enum WS_STATUS {
   PENDING = 'PENDING',
   READY = 'READY',
   ERROR = 'ERROR'
}

export type ChatMessageT = ChatMessageApiT & { id: string }

export type ChatStateT = {
   messages: ChatMessageT[]
   status: WS_STATUS
   error: boolean
}

type ActionType = ReturnType<typeof messagesReceived> | ReturnType<typeof statusChanged>

type ThunkActionT = ThunkAction<void, AppRootStateT, unknown, ActionType>

const initialState: ChatStateT = {
   messages: [],
   status: WS_STATUS.PENDING,
   error: false
}

export const chatReducer = (state = initialState, action: ActionType): ChatStateT => {
   switch (action.type) {
      case ACTION_TYPE_CHAT.MESSAGES_RECEIVED:
         return {
            ...state,
            messages: [
               ...state.messages,
               ...action.payload.map(m => ({...m, id: v1()}))]
               .filter((m, index, array) => index >= array.length - 100)
         }

      case ACTION_TYPE_CHAT.STATUS_CHANGED:
         return {...state, status: action.payload, error: action.payload === WS_STATUS.ERROR}

      default:
         return state
   }
}


const messagesReceived = (mess: ChatMessageT[]) => ({type: ACTION_TYPE_CHAT.MESSAGES_RECEIVED, payload: mess} as const)
const statusChanged = (status: WS_STATUS) => ({type: ACTION_TYPE_CHAT.STATUS_CHANGED, payload: status} as const)

const newMessHandler = (messages: ChatMessageApiT[], dispatch: Dispatch<ActionType>) => dispatch(messagesReceived(messages as ChatMessageT[]))
const newStatusHandler = (status: WS_STATUS, dispatch: Dispatch<ActionType>) => dispatch(statusChanged(status))

const subscribeMessageHandler = (dispatch: Dispatch<ActionType>) =>
   chatApi.subscribeMessage((messages) => newMessHandler(messages, dispatch))

const subscribeStatusHandler = (dispatch: Dispatch<ActionType>) =>
   chatApi.subscribeStatus((status) => newStatusHandler(status, dispatch))

export const startMessagesListening = (): ThunkActionT => (dispatch) => {
   chatApi.start()
   subscribeMessageHandler(dispatch)
   subscribeStatusHandler(dispatch)
}

export const stopMessagesListening = (): ThunkActionT => (dispatch) => {
   chatApi.stop()
   subscribeMessageHandler(dispatch)()
   subscribeStatusHandler(dispatch)()
}

export const sendMessage = (message: string): ThunkActionT => (dispatch) => {
   chatApi.sendMessage(message)
}