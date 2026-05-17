'use client'
import { useEffect, useState } from 'react'
export default function Spotlight() {
  const [p,setP]=useState({x:-9999,y:-9999})
  useEffect(()=>{
    const fn=(e:MouseEvent)=>setP({x:e.clientX,y:e.clientY})
    window.addEventListener('mousemove',fn,{passive:true})
    return ()=>window.removeEventListener('mousemove',fn)
  },[])
  return <div aria-hidden style={{position:'fixed',inset:0,zIndex:1,pointerEvents:'none',background:`radial-gradient(500px at ${p.x}px ${p.y}px,rgba(255,255,255,0.03),transparent 80%)`}}/>
}
