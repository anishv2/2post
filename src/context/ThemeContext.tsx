import { createContext, ReactNode, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal, indigo } from "@mui/material/colors";

const defaultTheme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: indigo[500],
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: teal[500],
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
  },
});

export const ThemeContext = createContext({});

export default function ThemeDataProvider({ children }: { children: ReactNode }) {
  const [theme] = useState(defaultTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
