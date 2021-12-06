// вот вам функция для сохранения объектов в память браузера
// (данные в этом хранилище сохраняться даже при перезагрузке компа):
export function saveState<T>(key: string, state: T) {
   const stateAsString = JSON.stringify(state)
   localStorage.setItem(key, stateAsString)
}

// и вот вам функция для получения сохранённого объекта в памяти браузера:
export function restoreState<T>(key: string, defaultState: T) {
   let state = defaultState
   const stateAsString = localStorage.getItem(key)
   if (stateAsString !== null) state = JSON.parse(stateAsString) as T
   return state
}

