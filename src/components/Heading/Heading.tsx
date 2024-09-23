import { ReactNode } from "react"
import { HeadingStyle, HeadingContainer, HeadingShadowsStyle, HeadingPatternStyle } from "./Heading.styles"


interface HeadingProps {
  children: ReactNode
  fontSize?: number
  color?: "pink" | "yellow" | "purple" | "fuchsia"
  wrapText?: boolean
}
export const Heading = ({children, fontSize = 220, color = "fuchsia", wrapText = true}:HeadingProps)=> {
  return(
    <HeadingContainer>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText}>
        {children}
      </HeadingShadowsStyle>
      <HeadingStyle fontSize={fontSize} color={color} $wrapText={wrapText}>
        {children}
      </HeadingStyle>
      <HeadingPatternStyle fontSize={fontSize} color={color} $wrapText={wrapText}>
        {children}
      </HeadingPatternStyle>
    </HeadingContainer>
  )
}