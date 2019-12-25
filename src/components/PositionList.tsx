import React from 'react'
import styled from 'styled-components'
import ScrollNotice from './ScrollNotice'
import { usePositionData } from '../api'
const NewPositionList = styled.div`
  width: 850px;
  height: 300px;
  background: #ffffff;
  box-shadow: 0 0 15px 0 rgba(31, 56, 88, 0.08);
  border-radius: 3px;
  float: left;
  overflow: hidden;
  position: relative;
`
const MorePositon = styled.div`
  height: 49px;
  border-bottom: 1px solid rgba(31, 56, 88, 0.06);
  line-height: 49px;
  padding: 0 14px;
  background: white;
  font-size: 14px;
  color: #000000;
  position: relative;
  z-index: 2;
`
const ClickMorePosition = styled.div`
  float: right;
  font-size: 14px;
  color: rgba(31, 56, 88, 0.6);
  cursor: pointer;
  text-decoration: none;
`

const PositionList: React.FC = () => {
  const positionData = usePositionData()
  return (
    <NewPositionList>
      <MorePositon>
        最新职位
        <ClickMorePosition>更多</ClickMorePosition>
      </MorePositon>
      <ScrollNotice positionData={positionData} />
    </NewPositionList>
  )
}

export default PositionList
