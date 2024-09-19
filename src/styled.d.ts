import {} from "styled-components"
import { defaultTheme } from "./theme/DefaultTheme"

declare module "styled-components" {
	type Theme = typeof defaultTheme
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends Theme {}
}


export {}