import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AppWithProviders } from "./app";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>
);
