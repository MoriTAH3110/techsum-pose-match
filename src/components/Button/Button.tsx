import { ButtonStyle, ButtonContainer } from "./Button.styles";

interface ButtonProps {
  children: string
}

export const Button = ({children}:ButtonProps) => {
  
  
  return (
    <ButtonContainer>
      <ButtonStyle data-text-content={children}>
        {children}
      </ButtonStyle>
    </ButtonContainer>
  )

}