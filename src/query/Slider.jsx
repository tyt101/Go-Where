import React, { useEffect, useMemo, useRef, useState } from 'react'
import './Slider.css'
export default function Slider(props) {
  const {title, start, end, onStartChange, onEndChange} = props
  
  const [curStart, setCurStart] = useState(() => start / 24 * 100)
  const [curEnd, setCurEnd] = useState(() => end / 24 * 100)

  const startPercent = useMemo(() => {
    if(curStart < 0) return 0
    if(curStart > 100) return 100
    return curStart
  },[curStart])

  const endPercent = useMemo(() => {
    if(curEnd < 0) return 0
    if(curEnd > 100) return 100
    return curEnd
  },[curEnd])

  const startHours = useMemo(() => {
    return Math.round(startPercent * 24 / 100)
  },[startPercent])

  const endHours = useMemo(() => {
    return Math.round(endPercent * 24 / 100)
  },[endPercent])

  const range = useRef()
  const rangeWidth = useRef()

  const startHandle = useRef()
  const endHandle = useRef()

  // 缓存上一次的位置
  const lastStartX = useRef()
  const lastEndX = useRef()

  const onStartTouchBegin = (e) => {
    const touch = e.targetTouches[0]
    lastStartX.current = touch.pageX
  }
  const onStartTouchMove = (e) => {
    const touch = e.targetTouches[0]
    const distance = touch.pageX - lastStartX.current
    lastStartX.current = touch.pageX
    setCurStart(start => start + distance / rangeWidth.current * 100)
  }
  const onEndTouchBegin = (e) => {
    const touch = e.targetTouches[0]
    lastEndX.current = touch.pageX
  }
  const onEndTouchMove = (e) => {
    const touch = e.targetTouches[0]
    const distance = touch.pageX - lastEndX.current
    lastEndX.current = touch.pageX
    setCurEnd(end => end + distance / rangeWidth.current * 100)
  }

  useEffect(() => {
    rangeWidth.current = parseFloat(
        window.getComputedStyle(range.current).width
    );
  }, []);
  
  useEffect(() => {
    startHandle.current.addEventListener('touchstart',onStartTouchBegin,false)
    startHandle.current.addEventListener('touchmove',onStartTouchMove,false)
    endHandle.current.addEventListener('touchstart',onEndTouchBegin,false)
    endHandle.current.addEventListener('touchmove',onEndTouchMove,false)
    
  },[])
  
  useEffect(() => {
    if(startHours <= endHours)
    onStartChange(startHours)
  },[endHours, onStartChange, startHours])

  useEffect(() => {
    if(startHours <= endHours)
    onEndChange(endHours)
  },[endHours, onEndChange, startHours])

  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={range}>
          <div 
            className="slider-range"
            style={{
              left: startPercent + '%',
              width: endPercent - startPercent + '%'
            }}
          ></div>

          <i 
            className="slider-handle"
            style={{
              left: startPercent + '%',
            }}
            ref={startHandle}
          ></i>
          <i
            className="slider-handle"
            style={{
              left: endPercent + '%'
            }}
            ref={endHandle}
          ></i>
        </div>
      </div>
    </div>
  )
}
