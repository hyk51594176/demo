import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ScrollNoticeProps, PositionListAttr, UlListProps } from '../types'
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
const UlList = React.forwardRef<HTMLUListElement, UlListProps>(({ positionData }, ref) => {
  return (
    <ul ref={ref}>
      {positionData.map(obj => (
        <SrollContent key={obj.positionId}>
          <Position>{obj.name}</Position>
          <Time>{obj.applyTimeDesc}</Time>
          <City>{obj.workLocation}</City>
        </SrollContent>
      ))}
    </ul>
  )
})

const ScrollNotice: React.FC<ScrollNoticeProps> = ({ positionData, delay = 40 }) => {
  const [top, setTop] = useState(0)
  const [stop, setStop] = useState(false)
  const ulEl = useRef<HTMLUListElement>(null)
  const continer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const timer = setInterval(() => {
      if (stop) return
      if (continer.current === null || ulEl.current === null) return
      if (Math.abs(continer.current.offsetTop) >= ulEl.current.offsetHeight) setTop(0)
      else setTop(top - 1)
    }, delay)
    return () => clearInterval(timer)
  }, [positionData, top, stop, delay])
  return (
    <PositionList top={top} onMouseMove={setStop.bind(null, true)} ref={continer} onMouseOut={setStop.bind(null, false)}>
      <UlList ref={ulEl} positionData={positionData} />
      {/* 无缝滚动 */}
      <UlList positionData={positionData} />
    </PositionList>
  )
}

export default ScrollNotice
