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
interface SliderValidateProps {
  text?: string
  confirmText?: string
  trigger?: string
  errCallback?: Function
  onChange?: Function
}

const SliderValidate: React.FC<SliderValidateProps> = ({ trigger = 'hover', errCallback, confirmText = '验证通过', text = '向右拖动滑块填充拼图', onChange }, ref) => {
  const [beginClientX, setBeginClientX] = useState(0)
  const [mouseMoveStata, setMouseMoveStata] = useState(false)
  const [maxwidth, setMaxwidth] = useState(0)
  const [confirmSuccess, setConfirmSuccess] = useState(false)
  const [dragBgWidth, setDragBgWidth] = useState('')
  const [handlerLeft, setHandlerLeft] = useState('')
  const [barLeft, setBarLeft] = useState('0px')
  const [imgShow, setImgShow] = useState(trigger === 'always')
  const [result, setResult] = useState({
    bgImg: '',
    barImg: '',
    x: 0,
    y: 0,
    sliderToken: ''
  })
  const img = useRef<HTMLImageElement>(null)
  const dragDiv = useRef<HTMLDivElement>(null)
  const moveDiv = useRef<HTMLDivElement>(null)
  const initImg = useCallback(() => {
    if (confirmSuccess) return
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
  }, [confirmSuccess])

  const reset = useCallback(
    (err?: Error) => {
      if (err && errCallback !== undefined) {
        errCallback(err)
      }
      setHandlerLeft('0px')
      setDragBgWidth('0px')
      setBarLeft('0px')
      setConfirmSuccess(false)
      setMouseMoveStata(false)
      initImg()
    },
    [initImg, errCallback]
  )
  const successFunction = useCallback(
    res => {
      setConfirmSuccess(true)
      setImgShow(trigger === 'always')
      setHandlerLeft(`${maxwidth}px`)
      setDragBgWidth(`${maxwidth}px`)
      onChange !== undefined && onChange(res.data.sliderToken)
    },
    [maxwidth, onChange, trigger]
  )
  const mouseMoveFn = useCallback(
    e => {
      if (confirmSuccess) return
      if (!imgShow) {
        setImgShow(true)
      }
      let width = e.clientX - beginClientX
      if (mouseMoveStata) {
        if (width > 0 && width <= maxwidth) {
          setHandlerLeft(`${width}px`)
          setBarLeft(`${width}px`)
          setDragBgWidth(`${width}px`)
        }
      }
    },
    [beginClientX, confirmSuccess, imgShow, maxwidth, mouseMoveStata]
  )
  const moseUpFn = useCallback(() => {
    setMouseMoveStata(false)
    if (confirmSuccess) return
    const x = Number(barLeft.replace('px', '')) / ((img.current as HTMLImageElement).width / (img.current as HTMLImageElement).naturalWidth)
    const { y, sliderToken } = result
    userService
      .checkSlider({ x, y, sliderToken })
      .then(successFunction)
      .catch(reset)
  }, [confirmSuccess, barLeft, result, successFunction, reset])

  const mousedownFn = useCallback(
    e => {
      if (!confirmSuccess) {
        e.preventDefault() // 阻止文字选中等 浏览器默认事件
        setMouseMoveStata(true)
        setBeginClientX(e.clientX)
      }
    },
    [confirmSuccess]
  )
  const touchStart = useCallback(
    e => {
      if (!confirmSuccess) {
        e.preventDefault() // 阻止文字选中等 浏览器默认事件
        setMouseMoveStata(true)
        setBeginClientX(e.changedTouches[0].clientX)
      }
    },
    [confirmSuccess]
  )
  const touchMove = useCallback(
    e => {
      if (confirmSuccess) return
      if (!imgShow) setImgShow(true)
      let width = e.changedTouches[0].clientX - beginClientX
      if (mouseMoveStata) {
        if (width > 0 && width <= maxwidth) {
          setHandlerLeft(`${width}px`)
          setBarLeft(`${width}px`)
          setDragBgWidth(`${width}px`)
        }
      }
    },
    [beginClientX, confirmSuccess, imgShow, maxwidth, mouseMoveStata]
  )
  const touchEnd = useCallback(
    e => {
      setMouseMoveStata(false)
      if (confirmSuccess || img.current === null) return
      const x = Number(barLeft.replace('px', '')) / (img.current.width / img.current.naturalWidth)
      const { y, sliderToken } = result
      userService
        .checkSlider({ x, y, sliderToken })
        .then(successFunction)
        .catch(reset)
    },
    [confirmSuccess, barLeft, result, successFunction, reset]
  )

  const mouseoutFn = useCallback(
    e => {
      if (!mouseMoveStata) setImgShow(false)
    },
    [mouseMoveStata]
  )

  useEffect(() => {
    if (dragDiv.current && moveDiv.current) {
      setMaxwidth(dragDiv.current.clientWidth - moveDiv.current.clientWidth)
    }
    initImg()
    if (trigger !== 'always') {
      document.addEventListener('click', mouseoutFn)
    }
    return () => document.removeEventListener('click', mouseoutFn)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SliderContiner ref={ref}>
      <div className="slider-validate">
        {imgShow && (
          <div className="bgmain">
            <img src={result.bgImg} className="bg" ref={img} alt="" />
            <img src={result.barImg} className="bar" style={{ left: barLeft }} alt="" />
            <i
              className="el-icon-refresh"
              onClick={() => {
                reset()
              }}
            />
          </div>
        )}
        <div className="drag" ref={dragDiv} onMouseMove={mouseMoveFn} onMouseUp={moseUpFn}>
          <div className="drag_bg" style={{ width: dragBgWidth }}></div>
          <div className="drag_text" style={{ color: confirmSuccess ? '#fff' : undefined }}>
            {!mouseMoveStata ? (confirmSuccess ? confirmText : text) : ''}
          </div>
          <div
            ref={moveDiv}
            onMouseDown={mousedownFn}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            className={confirmSuccess ? 'handler handler_ok_bg' : 'handler handler_bg'}
            style={{ left: handlerLeft }}
          ></div>
        </div>
      </div>
    </SliderContiner>
  )
}
export default React.forwardRef<SliderValidateProps>(SliderValidate)
