# pwa

- In Network Tab

  - Turn offline
  - Disable cache to ensure using the service worker

- In Application Tab

  - can click unregister to see if service worker really works

- make sure to close tab to allow service worker to activate

## install AndroidStudio <https://developer.android.com/studio>

- at bottom right open Configure > AVD Manager
- run the emulator
- on Desktop go to chrome://inspect/#devices
  - Click Configure...
  - Enable port forwarding
  - close Configure dialog
- on Emulator go to localhost:8080
- select inspect link under Remote Target to run Chrome DevTools for the device

## after testing

- on Emulator bring up Chrome kabob menu click the i for Site Settings and click the Clear & reset button

- [Install Criteria for PWA](https://web.dev/install-criteria/)
- [Customize PWA Installation](https://web.dev/customize-install/)
- [Safari PWA](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
- [Best Practices for Asking for Permission](https://www.youtube.com/watch?v=4QQyjqtHwlY)
- [Remote Debugging](https://developer.chrome.com/docs/devtools/remote-debugging/)
- [Communicating with Web Workers (Service Workers)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#sending_messages_to_and_from_a_dedicated_worker)

- web push notification

  - fetch
  - push notifications
  - notification interaction
  - background sync

- service worker lifecycle

register
install
activate
idle
terminated
