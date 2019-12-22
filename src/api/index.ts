import data from '../assets/data.json'
import { useState, useEffect } from 'react';
import { PositionData } from '../types/index.js';

export const getPosition = function () {
  return new Promise<PositionData[]>((resolve,reject)=>{
    setTimeout(() => {
      resolve(data)
    });
  })
}

export function usePositionData() {
  const data:Array<PositionData>=[]
  const [positionData,setPositionData] = useState(data)
  useEffect(()=>{
    getPosition().then(setPositionData)
  },[])
  return positionData
}

export function useResize() {
  const [innerHeight,setInnerHeight] = useState(window.innerHeight)
  function onResize() {
    setInnerHeight(window.innerHeight)
  }
  useEffect(()=>{
    window.addEventListener('resize',onResize)
    return ()=>window.removeEventListener('resize',onResize)
  },[innerHeight])
  return innerHeight
}