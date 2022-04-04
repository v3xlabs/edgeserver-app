import React from "react";
import { ThemeProvider } from "styled-components";
import { Default as Theme } from "../src/themes";
import {GlobalStyle} from '../src/common/utils/globalStyle';
import '../src/styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={Theme}><GlobalStyle /><Story /></ThemeProvider>
  )
]