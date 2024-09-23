import { ReactNode } from "react"
import { HeadingStyle, HeadingContainer, HeadingShadowsStyle, HeadingPatternStyle } from "./Heading.styles"


interface HeadingProps {
  children: ReactNode
  fontSize?: number
  color?: "pink" | "yellow" | "purple" | "fuchsia"
}
export const Heading = ({children, fontSize = 220, color = "fuchsia"}:HeadingProps)=> {
  return(
    <HeadingContainer>
      <HeadingShadowsStyle fontSize={fontSize} color={color}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color}>
        {children}
      </HeadingShadowsStyle>
      <HeadingStyle fontSize={fontSize} color={color}>
        {children}
      </HeadingStyle>
      <HeadingPatternStyle fontSize={fontSize} color={color}>
        {children}
      </HeadingPatternStyle>
    </HeadingContainer>
  )
}