import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ScrollNoticeProps, PositionListAttr } from '../types'
const PositionList = styled.div.attrs<PositionListAttr>(props => ({
  style: {
    top: (props.top || 0) + 'px'
  }
}))<PositionListAttr>`
  position: absolute;
  z-index: 1;
  transition: all 0ms ease-in 0s;
  width: 100%;
`
const SrollContent = styled.li`
  overflow: hidden;
  padding: 0 14px
  line-height: 50px;
`
const Position = styled.a`
  float: left;
  color: #3c99d8;
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
  color: rgba(31, 56, 88, 0.6);
  text-align: right;
`
const City = styled.em`
  font-style: normal;
  float: right;
  margin-right: 70px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  width: 202px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ScrollNotice: React.FC<ScrollNoticeProps> = ({ positionData, delay = 40 }) => {
  const [top, setTop] = useState(0)
  const [stop, setStop] = useState(false)
  const ulEl = useRef<any>(null)
  const continer = useRef<any>(null)
  useEffect(() => {
    const timer = setInterval(() => {
      if (stop) return
      if (!continer || !ulEl) return
      if (Math.abs(continer.current.offsetTop) >= ulEl.current.offsetHeight) setTop(0)
      else setTop(top - 1)
    }, delay)
    return () => clearInterval(timer)
  }, [positionData, top, stop, delay])
  return (
    <PositionList top={top} onMouseMove={setStop.bind(null, true)} ref={continer} onMouseOut={setStop.bind(null, false)}>
      <ul ref={ulEl}>
        {positionData.map(obj => (
          <SrollContent key={obj.positionId}>
            <Position>{obj.name}</Position>
            <Time>{obj.applyTimeDesc}</Time>
            <City>{obj.workLocation}</City>
          </SrollContent>
        ))}
      </ul>
      {/* 无缝滚动 */}
      <ul>
        {positionData.map(obj => (
          <SrollContent key={obj.positionId}>
            <Position>{obj.name}</Position>
            <Time>{obj.applyTimeDesc}</Time>
            <City>{obj.workLocation}</City>
          </SrollContent>
        ))}
      </ul>
    </PositionList>
  )
}

export default ScrollNotice
