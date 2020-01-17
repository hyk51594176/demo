import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from '../store/reducer'
import { Form, Icon, Input, Button } from 'antd'
import { WrappedFormUtils, FormProps } from 'antd/lib/form/Form'

const LoginWarp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  background-image: ${() => `url(${require('../assets/background.png')})`};
  background-size: cover;
  justify-content: center;
  align-items: center;
  .login-wrap-icon {
    z-index: 10;
    position: absolute;
    top: 40px;
    left: 55px;
    width: 240px;
    height: 80px;
  }
  .continer {
    z-index: 1;
    margin-bottom: 50px;
    .ms-login {
      width: 360px;
      padding: 40px;
      border-radius: 10px;
      background-color: rgba(102, 88, 88, 0.45);
      .el-form-item__error {
        color: #fff;
      }
      .el-input--medium .el-input__inner {
        background: rgb(255, 255, 255);
        opacity: 0.9;
      }
    }
    .ms-title {
      text-align: center;
      font-size: 25px;
      color: #fff;
      margin-bottom: 30px;
    }
  }
`

interface FormData {
  loginName: string
  password: string
}

const LoginForm = Form.create({ name: 'register' })((props: FormProps) => {
  const { getFieldDecorator, validateFields } = props.form as WrappedFormUtils
  const onSubmit = useCallback(
    e => {
      e.preventDefault()
      validateFields((err: Error, values: FormData) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    [validateFields]
  )
  return (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        {getFieldDecorator('loginName', {
          rules: [{ required: true, message: 'Please input your username!' }]
        })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
})
const Login: React.FC = () => {
  const systemInfo = useSelector<RootState, RootState['systemInfo']>(state => state.systemInfo)
  return (
    <LoginWarp>
      <img src={require('../assets/title.png')} className="login-wrap-icon" alt="" />
      <div className="continer">
        <div className="ms-login">
          <div className="ms-title">{systemInfo.sysName}</div>
          <LoginForm />
        </div>
      </div>
    </LoginWarp>
  )
}

export default Login
