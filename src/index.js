import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme, theme as base } from '@chakra-ui/react'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import '@fontsource/poppins'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/700.css'
const theme = extendTheme({
  fonts: {
    heading: `poppins`,
    body: `poppins`,
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider  theme={theme}>
      <App />
    </ChakraProvider>
    <ReactQueryDevtools />
    </QueryClientProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
