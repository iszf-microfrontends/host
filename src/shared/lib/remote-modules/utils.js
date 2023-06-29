import { time } from '..';

export const fetchRemote = (url, remote) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;

    script.onerror = (error) => {
      console.error(error);
      reject(new Error(`Failed to fetch remote: ${remote}`));
    };

    script.onload = () => {
      const proxy = {
        get: (request) => window[remote].get(request),
        init: (arg) => {
          try {
            return window[remote].init(arg);
          } catch (error) {
            console.error(error);
            reject(new Error(`Failed to initialize remote: ${remote}`));
          }
        },
      };
      resolve(proxy);
    };

    document.head.appendChild(script);
  });

export const loadComponent =
  (remote, url, module, scope = 'default') =>
  async () => {
    await time.delay(2000);

    if (!(remote in window)) {
      await __webpack_init_sharing__(scope);
      const fetchedContainer = await fetchRemote(`${url}/remoteEntry.js`, remote);
      await fetchedContainer.init(__webpack_share_scopes__[scope]);
    }

    const container = window[remote];
    const factory = await container.get(module);
    const Component = factory();
    return Component;
  };
