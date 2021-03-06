import React, { useState } from 'react'
import styled from 'styled-components'
import { TabPropAttr, LinePropAttr } from '../types'

const HeaderBar = styled.div`
  background-color: #2c2f33;
  height: 52px;
  font-family: PingFangSC-Regular;
  overflow: hidden;
`
const HeadMain = styled.div`
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
`
const HeadMenu = styled.div`
  width: 100%;
  float: right;
`
const Logo = styled.a`
  margin-top: 16px;
  height: 100%;
  float: left;
  cursor: pointer;
`
const Line = styled.i<LinePropAttr>`
  float: left;
  color: white;
  font-style: normal;
  font-size: ${props => props.fontSize};
  line-height: ${props => props.lineHeight};
  margin: ${props => props.margin};
  opacity: 0.8;
`
const Tabs = styled.ul``
const Tab = styled.li<TabPropAttr>`
  display: inline;
  position: relative;
  color: ${props => (props.primary ? '#F37327' : '#fff')};
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.8;
  line-height: 52px;
  padding: 10px 15px;
  margin-left: 4px;
`

const LoginBtn = styled.div`
  opacity: 0.8;
  width: 340px;
  float: right;
  line-height: 52px;
  color: #fff;
  text-align: right;
  a {
    color: #fff;
  }
`
const Header: React.FC = () => {
  const [value, setValue] = useState(0)
  return (
    <HeaderBar>
      <HeadMain>
        <HeadMenu>
          <Logo>
            <img src="https://img.alicdn.com/tfs/TB1Zv8_lxSYBuNjSspjXXX73VXa-390-63.png" height="20" alt="" />
          </Logo>
          <Line fontSize="20px" lineHeight="52px" margin="0 10px">
            |
          </Line>
          <Line fontSize="14px" lineHeight="54px">
            社招官网
          </Line>
          <Tabs>
            <Tab onClick={() => setValue(0)} primary={value === 0}>
              首 &nbsp;&nbsp;页
            </Tab>
            <Tab onClick={() => setValue(1)} primary={value === 1}>
              社会招聘{' '}
            </Tab>
            <Tab onClick={() => setValue(2)} primary={value === 2}>
              校园招聘
            </Tab>
            <Tab onClick={() => setValue(3)} primary={value === 3}>
              了解阿里
            </Tab>
            <Tab onClick={() => setValue(4)} primary={value === 4}>
              个人中心
            </Tab>
            <LoginBtn>
              欢迎来到阿里巴巴集团招聘！
              <a href="/">登录</a>&nbsp;|&nbsp;<a href="/">注册</a>
            </LoginBtn>
          </Tabs>
        </HeadMenu>
      </HeadMain>
    </HeaderBar>
  )
}

export default Header
