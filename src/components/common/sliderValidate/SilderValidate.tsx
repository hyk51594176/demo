import { userService } from '../../../api'
import styled from 'styled-components'
import React, { useState, useCallback, useRef, useEffect } from 'react'
const SliderContiner = styled.div`
  .slider-validate {
    position: relative;
    width: 300px;
    .bgmain {
      position: absolute;
      top: -184px;
      background: #fff;
      height: 183px;
      width: 100%;
      .bg {
        position: absolute;
        z-index: 1;
        height: 100%;
      }
      .bar {
        position: absolute;
        z-index: 2;
        height: 100%;
      }
      i {
        color: #fff;
        font-size: 20px;
        z-index: 3;
        position: absolute;
        right: 4px;
        top: 8px;
        font-weight: bold;
        cursor: pointer;
      }
    }

    .drag {
      position: relative;
      border: 1px solid #e4e7eb;
      background-color: #f7f9fa;
      width: 100%;
      height: 34px;
      line-height: 34px;
      text-align: center;
      border-radius: 3px;
    }
    .handler {
      width: 40px;
      height: 32px;
      border: 1px solid #ccc;
      cursor: move;
      position: absolute;
      top: 0px;
      left: 0px;
      border-radius: 3px;
    }
    .handler_bg {
      background: #fff
        url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==')
        no-repeat center;
    }
    .handler_ok_bg {
      background: #fff
        url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==')
        no-repeat center;
    }
    .drag_bg {
      background-color: #03a9f4;
      height: 34px;
      width: 0px;
    }
    .drag_text {
      position: absolute;
      top: 0px;
      width: 100%;
      text-align: center;
      user-select: none;
      color: #45494c;
      font-size: 14px;
    }
  }
`
interface StyleDivProps {
  width?: string
  color?: string
  left?: string
}
const StyleDiv = styled.div.attrs<StyleDivProps>(props => ({
  style: {
    width: props.width,
    color: props.color,
    left: props.left
  }
}))<StyleDivProps>``
interface SliderValidateProps {
  text: string
  confirmText: string
  trigger: string
  errCallback: Function
  successCallback: Function
}

const SliderValidate: React.FC<SliderValidateProps> = ({ trigger, errCallback, confirmText, text, successCallback }) => {
  const [data, setData] = useState({
    beginClientX: 0 /* 距离屏幕左端距离 */,
    mouseMoveStata: false /* 触发拖动状态  判断 */,
    maxwidth: 0 /* 拖动最大宽度，依据滑块宽度算出来的 */,
    confirmSuccess: false /* 验证成功判断 */,
    dragBgWidth: '',
    handlerLeft: '',
    barLeft: '0px',
    imgShow: trigger === 'always'
  })
  const [result, setResult] = useState({
    bgImg: '',
    barImg: '',
    x: 0,
    y: 0,
    sliderToken: ''
  })
  const img = useRef(null)
  const dragDiv = useRef(null)
  const moveDiv = useRef(null)
  const initImg = useCallback(() => {
    if (data.confirmSuccess) return
    userService.initSlider().then(res => {
      const { sourceImage, newImage, sliderToken, x, y } = res.data
      setResult({
        bgImg: `data:image/jpg;base64,${sourceImage}`,
        barImg: `data:image/png;base64,${newImage}`,
        x,
        y,
        sliderToken
      })
    })
  }, [data.confirmSuccess])

  const reset = useCallback(
    (err?: Error) => {
      if (err) {
        errCallback(err)
      }
      setData({
        ...data,
        handlerLeft: `0px`,
        dragBgWidth: `0px`,
        barLeft: '0px',
        confirmSuccess: false,
        mouseMoveStata: false
      })

      initImg()
    },
    [data, initImg, errCallback]
  )
  const successFunction = useCallback(
    res => {
      setData({
        ...data,
        confirmSuccess: true,
        imgShow: trigger !== 'always' ? false : true,
        handlerLeft: `${data.maxwidth}px`,
        dragBgWidth: `${data.maxwidth}px`
      })
      successCallback(res.data.sliderToken)
    },
    [data, successCallback, trigger]
  )
  const mouseMoveFn = useCallback(
    e => {
      if (data.confirmSuccess) return
      if (!data.imgShow) {
        setData({
          ...data,
          imgShow: true
        })
      }
      let width = e.clientX - data.beginClientX
      if (data.mouseMoveStata) {
        if (width > 0 && width <= data.maxwidth) {
          setData({
            ...data,
            handlerLeft: `${width}px`,
            barLeft: `${width}px`,
            dragBgWidth: `${width}px`
          })
        }
      }
    },
    [data]
  )
  const moseUpFn = useCallback(() => {
    data.mouseMoveStata = false
    if (data.confirmSuccess) return
    const x = Number(data.barLeft.replace('px', '')) / (img.current.width / img.current.naturalWidth)
    const { y, sliderToken } = result
    userService
      .checkSlider({ x, y, sliderToken })
      .then(successFunction)
      .catch(reset)
  }, [data.barLeft, data.confirmSuccess, data.mouseMoveStata, result, reset, successFunction])

  const mousedownFn = useCallback(
    e => {
      if (!data.confirmSuccess) {
        e.preventDefault() // 阻止文字选中等 浏览器默认事件
        data.mouseMoveStata = true
        data.beginClientX = e.clientX
      }
    },
    [data.beginClientX, data.confirmSuccess, data.mouseMoveStata]
  )
  const touchStart = useCallback(
    e => {
      if (!data.confirmSuccess) {
        e.preventDefault && e.preventDefault() // 阻止文字选中等 浏览器默认事件
        data.mouseMoveStata = true
        data.beginClientX = e.changedTouches[0].clientX
      }
    },
    [data.beginClientX, data.confirmSuccess, data.mouseMoveStata]
  )
  const touchMove = useCallback(
    e => {
      if (data.confirmSuccess) return
      data.imgShow = true
      let width = e.changedTouches[0].clientX - data.beginClientX
      if (data.mouseMoveStata) {
        if (width > 0 && width <= data.maxwidth) {
          data.handlerLeft = `${width}px`
          data.barLeft = `${width}px`
          data.dragBgWidth = `${width}px`
        }
      }
    },
    [data.barLeft, data.beginClientX, data.confirmSuccess, data.dragBgWidth, data.handlerLeft, data.imgShow, data.maxwidth, data.mouseMoveStata]
  )
  const touchEnd = useCallback(
    e => {
      data.mouseMoveStata = false
      if (data.confirmSuccess || img.current === null) return
      const x = Number(data.barLeft.replace('px', '')) / (img.current.width / img.current.naturalWidth)
      const { y, sliderToken } = result
      userService
        .checkSlider({ x, y, sliderToken })
        .then(successFunction)
        .catch(reset)
    },
    [data.barLeft, data.confirmSuccess, data.mouseMoveStata, result, reset, successFunction]
  )

  const mouseoutFn = useCallback(
    e => {
      if (!data.mouseMoveStata) data.imgShow = false
    },
    [data.imgShow, data.mouseMoveStata]
  )

  useEffect(() => {
    data.maxwidth = dragDiv.current.clientWidth - moveDiv.current.clientWidth
    initImg()
    if (trigger !== 'always') {
      document.addEventListener('click', mouseoutFn)
    }
    return () => document.removeEventListener('click', mouseoutFn)
  }, [data.maxwidth, initImg, mouseoutFn, trigger])

  return (
    <SliderContiner>
      <div className="slider-validate">
        {data.imgShow && (
          <div className="bgmain">
            <img src={result.bgImg} className="bg" ref={img} alt="" />
            <img src={result.barImg} className="bar" style={{ left: data.barLeft }} alt="" />
            <i
              className="el-icon-refresh"
              onClick={() => {
                reset()
              }}
            />
          </div>
        )}
        <div className="drag" ref={dragDiv} onMouseMove={mouseMoveFn} onMouseUp={moseUpFn}>
          <StyleDiv className="drag_bg" width={data.dragBgWidth} />
          <StyleDiv className="drag_text" color={data.confirmSuccess ? '#fff' : undefined}>
            {!data.mouseMoveStata ? (data.confirmSuccess ? confirmText : text) : ''}
          </StyleDiv>
          <StyleDiv
            ref={moveDiv}
            onMouseDown={mousedownFn}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            className={data.confirmSuccess ? 'handler_ok_bg' : ''}
            left={data.handlerLeft}
          ></StyleDiv>
        </div>
      </div>
    </SliderContiner>
  )
}

SliderValidate.defaultProps = {
  text: '向右拖动滑块填充拼图',
  confirmText: '验证通过',
  trigger: 'hover',
  errCallback(err: Error) {},
  successCallback(data: any) {}
}
export default SliderValidate
