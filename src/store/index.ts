import thunk, { ThunkDispatch } from 'redux-thunk'
import { createStore, applyMiddleware, compose, Action, AnyAction } from 'redux'
import { reducer } from './reducer'
export type Dispatch<S = RootState, E = undefined, A extends Action = AnyAction> = ThunkDispatch<S, E, A>

export interface RootState {
  loading: boolean
  windowSize: { width: number; height: number } | null
  baseUrl: string
  token: string | undefined
  userId: string | undefined
  menuList: Array<any>
  systemInfo: {
    systemId: string
    sysName: string
    notST?: boolean
    layzLoading(path: string): () => Promise<any>
  }
  initRoute: null | any
  userInfo: any
  sysList: Array<any>
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
