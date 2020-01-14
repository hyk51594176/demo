import React, { useReducer, useContext, createContext } from 'react'

interface DisPatch {
  (action: Action): void
}
interface ThunkDisPatch<T> {
  (action: Action): void
  (dispatch: DisPatch, state?: T): Promise<any>
}
interface Action {
  type: string
  payload: any
}
interface StoreProvider<T> {
  initState: T
  reducer: React.Reducer<any, any>
  children?: React.ReactNode
}

function warpDispatch<T = any>(dispatch: DisPatch, state: T) {
  return (action: ThunkDisPatch<T>) => {
    if (typeof action === 'function') {
      return action(dispatch, state)
    } else {
      return dispatch(action)
    }
  }
}

export const Store = createContext(null as any)

export function Provider<T = any>({ children, initState, reducer }: StoreProvider<T>) {
  const [state, dispatch] = useReducer(reducer, initState)
  const value = { state, dispatch: warpDispatch<T>(dispatch, state) }
  return <Store.Provider value={value}>{children}</Store.Provider>
}
function useStore<T = any>(name: keyof T): [T[keyof T], ThunkDisPatch<T>]
function useStore<T = any>(): [T, ThunkDisPatch<T>]
function useStore<T = any>(name?: keyof T) {
  const { state, dispatch } = useContext<{ state: T; dispatch: ThunkDisPatch<T> }>(Store)
  return [name ? state[name] : state, dispatch]
}
export { useStore }
