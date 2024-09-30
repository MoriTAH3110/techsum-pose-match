import { ReactNode } from "react"
import { HeadingStyle, HeadingContainer, HeadingShadowsStyle, HeadingPatternStyle } from "./Heading.styles"


interface HeadingProps {
  children: ReactNode
  fontSize?: number
  color?: "pink" | "yellow" | "purple" | "fuchsia"
  wrapText?: boolean
  units: "px" | "%" | "em" | "rem"  
}
export const Heading = ({
  children,
  fontSize = 220,
  color = "fuchsia",
  wrapText = true,
  units = "px"
}:HeadingProps)=> {
  return(
    <HeadingContainer>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText} units={units}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText} units={units}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText} units={units}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText} units={units}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText} units={units}>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText} units={units}>
        {children}
      </HeadingShadowsStyle>
      <HeadingStyle fontSize={fontSize} color={color} $wrapText={wrapText} units={units}>
        {children}
      </HeadingStyle>
      <HeadingPatternStyle fontSize={fontSize} color={color} $wrapText={wrapText} units={units}>
        {children}
      </HeadingPatternStyle>
    </HeadingContainer>
  )
}