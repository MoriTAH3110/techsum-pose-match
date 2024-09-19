import { ReactNode } from "react"
import { HeadingStyle, HeadingContainer, HeadingShadowsStyle, HeadingPatternStyle } from "./Heading.styles"


interface HeadingProps {
  children: ReactNode
}
export const Heading = ({children}:HeadingProps)=> {
  return(
    <HeadingContainer>
      <HeadingShadowsStyle>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle>
        {children}
      </HeadingShadowsStyle>
      <HeadingShadowsStyle>
        {children}
      </HeadingShadowsStyle>
      <HeadingStyle>
        {children}
      </HeadingStyle>
      <HeadingPatternStyle>
        {children}
      </HeadingPatternStyle>
    </HeadingContainer>
  )
}