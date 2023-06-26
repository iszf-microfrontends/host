import { Loader } from "@mantine/core";
import { ReactNode, Suspense, lazy } from "react";
import ErrorBoundary from "../error-boundary";

type RemoteComponentProps = {
  remote: string;
  url: string;
  component: string;
  fallback?: string | ReactNode;
};

export function RemoteComponent({
  remote,
  url,
  component,
  fallback = <Loader />,
}: RemoteComponentProps): JSX.Element | null {
  const Component = lazy(loadComponent(remote, url, `./${component}`));

  return (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}

function loadComponent(name: string, url: string, component: string) {
  return async () => {
    if (!(name in window)) {
      // @ts-ignore
      await __webpack_init_sharing__("default");
      // TODO: remoteEntry.js HARD CODE
      const loadedModule = await loadModule(`${url}/remoteEntry.js`, name);
      // @ts-ignore
      await loadedModule.init(__webpack_share_scopes__[scope]);
    }
    // @ts-ignore
    const container = window[name];
    const factory = await container.get(component);
    const Component = factory();
    return Component;
  };
}

function loadModule(url: string, name: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;

    script.onerror = (err) => {
      console.error(err);
      reject(new Error(`Failed to load remote module: ${name}`));
    };

    script.onload = () => {
      const proxy = {
        // @ts-ignore
        get: (key: string) => window[name].get(key),
        // @ts-ignore
        init: (arg) => {
          try {
            // @ts-ignore
            return window[name].init(arg);
          } catch (err) {
            console.error(err);
            reject(new Error(`Failed to initialize remote module: ${name}`));
          }
        },
      };
      resolve(proxy);
    };

    document.head.appendChild(script);
  });
}
