import { MantineProvider } from "@mantine/core";
import { ComponentType } from "react";

export function withMantine(WrappedComponent: ComponentType) {
  return function wrapper(): JSX.Element | null {
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <WrappedComponent />
      </MantineProvider>
    );
  };
}
