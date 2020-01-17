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
  user: any
  sysList: Array<any>
}
interface Action {
  type: string
  payload?: any
}

const initState: RootState = {
  baseUrl: 'test',
  loading: false,
  windowSize: null,
  token: undefined,
  userId: undefined,
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
  user: null
}

export function reducer(state = initState, action: Action): RootState {
  switch (action.type) {
    // case 'FETCH_DATA':

    default:
      return state
  }
}
