import { ComponentType } from "react";
import { BrowserRouter } from "react-router-dom";

export function withRouter(WrappedComponent: ComponentType) {
  return function wrapper(): JSX.Element | null {
    return (
      <BrowserRouter>
        <WrappedComponent />
      </BrowserRouter>
    );
  };
}
