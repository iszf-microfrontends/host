import { Title } from "@mantine/core";
import { withProviders } from "./providers";
import { Pages } from "../pages";

function App(): JSX.Element | null {
  return <Pages />;
}

export const AppWithProviders = withProviders(App);
