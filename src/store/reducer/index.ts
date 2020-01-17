import { RootState } from '../'
import Cookies from 'js-cookie'

interface Action {
  type: string
  payload?: any
}
const initState: RootState = {
  baseUrl: 'test',
  loading: false,
  windowSize: null,
  token: Cookies.get('st-creditech.com.token'),
  userId: Cookies.get('st-creditech.com.user_id'),
  menuList: [],
  systemInfo: {
    sysName: '平台管理系统',
    systemId: '6',
    layzLoading(path: string) {
      return () => import(`../../pages/usercenter/${path.replace(/^(\/|\/?usercenter)?\//, '')}.tsx`)
    }
  },
  sysList: [],
  initRoute: null,
  userInfo: null
}
/* eslint-disable no-fallthrough */
export function reducer(state = initState, { type, payload }: Action): RootState {
  console.log(payload)
  switch (type) {
    case 'LOGIN':
      Cookies.set('st-creditech.com.token', payload.token)
      Cookies.set('st-creditech.com.user_id', payload.userId)
    case 'LOADING':
    case 'USER_INFO':
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}
