import {WS_STATUS} from "../bll/reducer/chat-reducer";

export enum Events {
   MESSAGES_RECEIVED = 'MESSAGES_RECEIVED',
   STATUS_CHANGED = 'STATUS_CHANGED',
}

let ws: WebSocket | null = null

const subscribes = {
   [Events.MESSAGES_RECEIVED]: [] as MessagesReceivedT[],
   [Events.STATUS_CHANGED]: [] as StatusChangedT[]
}

const notifyAboutStatusS = (status: WS_STATUS) => subscribes[Events.STATUS_CHANGED].forEach(s => s(status))

const openHandler = () => notifyAboutStatusS(WS_STATUS.READY)

const errorHandler = () => notifyAboutStatusS(WS_STATUS.ERROR)

const closeHandler = () => {
   notifyAboutStatusS(WS_STATUS.PENDING)
   setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
   const newMessages = JSON.parse(e.data)

   subscribes[Events.MESSAGES_RECEIVED].forEach(s => s(newMessages))
}

const cleanUp = () => {
   ws?.removeEventListener('close', closeHandler)
   ws?.removeEventListener('message', messageHandler)
   ws?.removeEventListener('open', openHandler)
   ws?.removeEventListener('error', errorHandler)
}

const createChannel = () => {
   cleanUp()
   ws?.close()

   ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

   notifyAboutStatusS(WS_STATUS.PENDING)

   ws.addEventListener('open', openHandler)
   ws.addEventListener('message', messageHandler)
   ws.addEventListener('close', closeHandler)
   ws.addEventListener('error', errorHandler)
}

export const chatApi = {
   start() {
      createChannel()
   },
   stop() {
      subscribes[Events.MESSAGES_RECEIVED] = []
      subscribes[Events.STATUS_CHANGED] = []
      cleanUp()
      ws?.close()
   },
   subscribeStatus(callback: StatusChangedT) {
      subscribes[Events.STATUS_CHANGED].push(callback)

      return () => subscribes[Events.STATUS_CHANGED] = subscribes[Events.STATUS_CHANGED].filter(s => s !== callback)
   },
   subscribeMessage(callback: MessagesReceivedT) {
      subscribes[Events.MESSAGES_RECEIVED].push(callback)

      return () => subscribes[Events.MESSAGES_RECEIVED] = subscribes[Events.MESSAGES_RECEIVED].filter(s => s !== callback)
   },
   sendMessage(message: string) {
      ws?.send(message)
   }
}

export type ChatMessageApiT = {
   message: string
   photo: string
   userId: number
   userName: string
}

type MessagesReceivedT = (messages: ChatMessageApiT[]) => void
type StatusChangedT = (status: WS_STATUS) => void

