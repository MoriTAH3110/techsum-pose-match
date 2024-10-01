import { ReactNode } from "react"
import { HeadingStyle, HeadingContainer, HeadingShadowsStyle, HeadingPatternStyle } from "./Heading.styles"
import { ThemeColors } from "../../types/Theme.types"


interface HeadingProps {
  children: ReactNode
  fontSize?: number
  color?: ThemeColors
  layerFillColor?: ThemeColors;
  wrapText?: boolean
  units?: "px" | "%" | "em" | "rem"
}
export const Heading = ({
  children,
  fontSize = 220,
  color = "fuchsia",
  layerFillColor="beige",
  wrapText = true,
  units = "px"
}: HeadingProps) => {
  return (
    <HeadingContainer>
      {
        [...Array(6)].map(() => (
          <HeadingShadowsStyle fontSize={fontSize} color={color} $wrapText={wrapText} units={units} layerFillColor={layerFillColor}>
            {children}
          </HeadingShadowsStyle>
        ))
      }
      <HeadingStyle fontSize={fontSize} color={color} $wrapText={wrapText} units={units}>
        {children}
      </HeadingStyle>
      <HeadingPatternStyle fontSize={fontSize} color={color} $wrapText={wrapText} units={units}>
        {children}
      </HeadingPatternStyle>
    </HeadingContainer>
  )
}