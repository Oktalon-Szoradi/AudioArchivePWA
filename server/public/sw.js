/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-e21a23a0'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/AboutView-B5NmEp4W.js",
    "revision": null
  }, {
    "url": "assets/AboutView-YmFb8C06.css",
    "revision": null
  }, {
    "url": "assets/index-BSU7TynV.css",
    "revision": null
  }, {
    "url": "assets/index-CRkqNBQv.js",
    "revision": null
  }, {
    "url": "assets/PageNotFound-7XVdFCK9.js",
    "revision": null
  }, {
    "url": "assets/PageNotFound-DeF74uG0.css",
    "revision": null
  }, {
    "url": "assets/QSeparator-D1PbfGAG.js",
    "revision": null
  }, {
    "url": "assets/SettingsView-CoXKclrv.css",
    "revision": null
  }, {
    "url": "assets/SettingsView-DwVU-uBm.js",
    "revision": null
  }, {
    "url": "assets/ShelfView-BR91oNdA.css",
    "revision": null
  }, {
    "url": "assets/ShelfView-CHb0SMSq.js",
    "revision": null
  }, {
    "url": "assets/worker-lPYB70QI.js",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "117ce594f8ff04db38990edcabdcecb1"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "AudioArchive_Logo.svg",
    "revision": "ef1fc564d7911215e18a1c97b83dca04"
  }, {
    "url": "favicon.ico",
    "revision": "1ba2ae710d927f13d483fd5d1e548c9b"
  }, {
    "url": "manifest.webmanifest",
    "revision": "cecc69f38502bc5ad44369b38e6b57fe"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "records",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 86400
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
