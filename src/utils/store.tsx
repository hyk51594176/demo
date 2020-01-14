import React, { useReducer, useContext, createContext } from 'react'

interface DisPatch<T> {
  (action: Action<T>): void
}

interface ActionFn<T> {
  (dispatch: DisPatch<T>, state: T): Promise<any>
}

interface ThunkDisPatch<T> {
  (action: ActionFn<T>): Promise<any>
  (action: Action<T>): void
}
interface Action<T> {
  type: string
  payload?: T[keyof T]
}
interface StoreProvider<T> {
  initState: T
  reducer: React.Reducer<any, any>
  children?: React.ReactNode
}

function warpDispatch<T = any>(dispatch: DisPatch<T>, state: T): ThunkDisPatch<T> {
  function dispatchfn(action: ActionFn<T>): Promise<any>
  function dispatchfn(action: Action<T>): void
  function dispatchfn(action: Function | Action<T>) {
    if (typeof action === 'function') {
      return action(dispatch, state)
    } else {
      return dispatch(action)
    }
  }
  return dispatchfn
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
