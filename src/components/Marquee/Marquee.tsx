import { useEffect, useRef, useState } from "react"
import {MarqueeStyle, MarqueeTextStyle} from "./Marquee.styles"

interface MarqueeProps {
  children: string
  
}

export const Marquee = ({children}: MarqueeProps)=> {
  const MAX_WIDTH = 5000
  const SPEED = 200
  const [segmentWidth, setSegmentWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const repeat = segmentWidth ? Math.ceil(MAX_WIDTH / segmentWidth + 1) : 20
  const duration = segmentWidth / SPEED

  const segments = Array.from(new Array(repeat)).map((_, index) => index + 1)



  useEffect(()=>{
    if(containerRef.current){
      const elements = Array.from(containerRef.current.childNodes)
      const widthList: Array<number> = elements.map(elem => {
        const content = elem.firstChild as HTMLSpanElement
        return content.getBoundingClientRect().width
      })

      const maxWidth = Math.max(...widthList)

      setSegmentWidth(maxWidth)
    }
  }, [setSegmentWidth])
  
  return (
    <MarqueeStyle ref={containerRef}>
      {segments.map(count => {
        const key = `segment-${count}`
        return (
          <MarqueeTextStyle
            key={key}
            $duration={duration}
          >
            <span>{children}</span> 
          </MarqueeTextStyle>
        )
      })}
    </MarqueeStyle>
  )

}