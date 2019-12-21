import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ScrollNoticeProps, PositionListAttr } from '../types';
const PositionList = styled.div<PositionListAttr>`
  position: absolute;
  z-index: 1;
  width: 100%;
  transition: all 0ms ease-in 0s;
  transform:${props => 'translateY(' + (props.top || 0) + 'px)'};
 `
const SrollContent = styled.li`
  overflow: hidden;
  padding: 0 14px
  line-height: 50px;
`
const Position = styled.a`
  float: left;
  color: #3C99D8;
  font-size: 14px;
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const Time = styled.em`
  font-style: normal;
  float: right;
  width: 70px;
  font-size: 14px;
  color: rgba(31,56,88,0.60);
  text-align: right;
`
const City = styled.em`
  font-style: normal;
  float: right;
  margin-right: 70px;
  font-size: 14px;
  color: rgba(0,0,0,0.60);
  width: 202px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ScrollNotice: React.FC<ScrollNoticeProps> = ({positionData}) => {
  const [top, setTop] = useState(0)
  const [stop, setStop] = useState(false)
  const ulEl = useRef<any>(null)
  const continer = useRef<any>(null)
  useEffect(() => {
    const timer = setInterval(() => {
      if (stop) return
      if (!continer || !ulEl) return 
      if (Math.abs(continer.current.offsetTop) >= ulEl.current.offsetHeight) setTop(0)
      else setTop(top-1) 
    })
    return () => clearInterval(timer)
  }, [positionData, top, stop])
  return <PositionList top={top} onMouseMove={setStop.bind(null, true)} ref={continer} onMouseOut={setStop.bind(null, false)}>
    <ul ref={ulEl}>
      {positionData.map(obj => <SrollContent key={obj.positionId}>
        <Position>{obj.name}</Position>
        <Time>{obj.applyTimeDesc}</Time>
        <City>{obj.workLocation}</City>
      </SrollContent>)}
    </ul>
    {/* 无缝滚动 */}
    <ul>
      {positionData.map(obj => <SrollContent key={obj.positionId}>
        <Position>{obj.departmentName}</Position>
        <Time>{obj.applyTimeDesc}</Time>
        <City>{obj.workLocation}</City>
      </SrollContent>)}
    </ul>
  </PositionList>
}

export default ScrollNotice;
