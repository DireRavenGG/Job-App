import { ThemeProvider } from "@mui/material/styles";
import "../styles/globals.css";
import theme from "../utils/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />;
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default MyApp;
