import { ThemeProvider } from "@mui/material/styles";
import "../styles/globals.css";
import theme from "../utils/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { SessionProvider } from "next-auth/react";
import Navigation from "../components/Navigation";
import { Job } from "../types/job";
import { useState } from "react";
import { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next";
const queryClient = new QueryClient();
const demoJobs = [
  {
    id: 1,
    title: "DEMO",
    datePosted: "02/10/21",
    status: "To Do",
    moreInfo:
      "Cards are only saved to state when not signed in. Edit button allows you to change more info and the title",
    user: "demo",
  },
  {
    id: 2,
    title: "DEMO 2",
    datePosted: "02/10/21",
    status: "In Progress",
    moreInfo:
      "Cards are only saved to state when not signed in. Edit button allows you to change more info and the title",
    user: "demo",
  },
  {
    id: 3,
    title: "DEMO 3",
    datePosted: "02/10/21",
    status: "Look Over",
    moreInfo:
      "Cards are only saved to state when not signed in. Edit button allows you to change more info and the title",
    user: "demo",
  },
  {
    id: 4,
    title: "DEMO 4",
    datePosted: "02/10/21",
    status: "Completed",
    moreInfo:
      "Cards are only saved to state when not signed in. Edit button allows you to change more info and the title",
    user: "demo",
  },
];

function MyApp({ Component, pageProps: { ...pageProps } }: any) {
  const [demo, setDemo] = useState(demoJobs);

  const demoHandler = (arr: Job[]) => {
    setDemo(arr);
  };

  return (
    <SessionProvider>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} setDemo={demoHandler} demo={demo} />;
          </ThemeProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </SessionProvider>
  );
}

export default MyApp;
