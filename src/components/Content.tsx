import React from 'react';
import styled from 'styled-components';
import PositionList from './PositionList';
import { LogoAttr, ShowPicAttr } from '../types';
const PositionContent = styled.div`
  width: 1180px;
  height: 300px;
  margin: 32px auto;
  font-family: PingFangSC-Regular
`
const Position = styled.div`
  height: 364px;
  width: 100%;
  overflow: hidden;
`
const Right = styled.div`
  width: 310px;
  float: right;
`

const ShowPic = styled.a<ShowPicAttr>`
  text-align: center;
  line-height: 140px;
  display: block;
  cursor: pointer;
  height: 140px;
  background: #FFFFFF;
  box-shadow: 0 0 15px 0 rgba(31,56,88,0.08);
  border-radius: 3px;
  margin-bottom:${props => props.marginBottom};
`

const Logo = styled.img<LogoAttr>`
  width: ${props => props.width};
  vertical-align: middle
  border: 0;
  text-align: center;
  line-height: 140px
`

const Content: React.FC = () => {
  return <Position>
    <PositionContent>
      <PositionList/>
      <Right>
        <ShowPic marginBottom='20px'>
          <Logo width='179px' src="https://img.alicdn.com/tfs/TB1Z7JvoxGYBuNjy0FnXXX5lpXa-358-136.png"/>
        </ShowPic>
        <ShowPic>
          <Logo  width='260px' src="https://img.alicdn.com/tfs/TB18tFCCH2pK1RjSZFsXXaNlXXa-240-34.svg"/>
        </ShowPic>
      </Right>
    </PositionContent>
  </Position>
  
  
}

export default Content;
