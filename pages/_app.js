import { ThemeProvider } from "@mui/material/styles";
import "../styles/globals.css";
import theme from "../utils/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />;
          </ThemeProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </SessionProvider>
  );
}

export default MyApp;
