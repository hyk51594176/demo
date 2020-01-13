import React, { useReducer, useContext, createContext } from 'react'

export const Store = createContext(null as any)

interface DisPatch {
  (action: Action): void
}
interface ThunkDisPatch {
  (action: Action): void
  (action: Function): (d: DisPatch) => Promise<any>
}
interface Action {
  type: string
  payload: any
}

function warpDispatch<T = any>(dispatch: DisPatch, state: T) {
  return (action: Action | Function) => {
    if (typeof action === 'function') {
      return action(dispatch, state)
    } else {
      return dispatch(action)
    }
  }
}
interface StoreProvider {
  initState: any
  reducer: React.Reducer<any, any>
  children?: React.ReactNode
}

export function Provider({ children, initState, reducer }: StoreProvider) {
  const [state, dispatch] = useReducer(reducer, initState)
  const value = { state, dispatch: warpDispatch(dispatch, state) }
  return <Store.Provider value={value}>{children}</Store.Provider>
}

export function useStore<T = any>(action?: Action) {
  const context = useContext<{ state: T; dispatch: ThunkDisPatch }>(Store)
  if (action) context.dispatch(action)
  return context
}
