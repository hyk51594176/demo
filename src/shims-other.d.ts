// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios'
declare module 'axios' {
  interface AxiosRequestConfig {
    hideLoading?: () => void
    showMsg?: boolean | string
    errorMsg?: boolean | string
    noproxy?: boolean
    custom?: boolean
    mockUrl?: string
    closeLoading?: boolean
  }
}
