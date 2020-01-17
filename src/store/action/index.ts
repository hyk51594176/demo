import md5 from 'blueimp-md5'

import useService from '../../api/modules/usercenter'
import { Dispatch, RootState } from '../'
export interface LoginParams {
  loginName: string
  password: string
  sliderToken: string
}
interface GetState {
  (): RootState
}
export const login = (params: LoginParams) => (dispatch: Dispatch) =>
  useService
    .login({
      ...params,
      password: md5(params.password)
    })
    .then(res => {
      dispatch({
        type: 'LOGIN',
        payload: {
          userId: res.userId,
          token: res.sessionId
        }
      })
      dispatch(getUserNameByUserId())
    })
export const getUserNameByUserId = () => (dispatch: Dispatch, getstate: GetState) => {
  const { userId } = getstate()
  return useService.getUserNameByUserId({ userId }).then(res => {
    dispatch({
      type: 'USER_INFO',
      payload: {
        userInfo: {
          ...res.data,
          businessType: res.data.roleInfos.length ? res.data.roleInfos[0].businessType : null
        }
      }
    })
  })
}
