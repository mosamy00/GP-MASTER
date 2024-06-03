import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
let queryClint = new QueryClient();
root.render(
  <QueryClientProvider client={queryClint}>
    <App />
    {/* <ReactQueryDevtools initialIsOpen="false" position="top-right" /> */}
  </QueryClientProvider>
);

reportWebVitals();
