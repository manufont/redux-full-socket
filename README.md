# redux-full-socket

An experimental full stack using redux and websockets.

The purpose of this project is to extends redux life cycle outside the client with websockets, by providing an API to its dispached actions.

Redux is used on both client and server in order to reuse client reducer. It has several benefits:
- CRUD tasks only needs to be implemented once
- The backend behaviour is entirely predictable: most server verifications may be avoided, resulting in an instant feedback for the client
- Actions can be broadcasted to every client that shares the same credentials (e.g mobile & destop), which lets you maintain a cross-device state

The server-side store can include additionnal reducers for server-specific tasks.

## progress

The project is at its very beginning.

For now, the server-side persistence is done by stringifying the store into a file. Not good.

The user management is done by asking the client a token, with no verification at all. Also not good.

The server-side state architecture needs to be improved.

Also, the project could benefit from socket.io Room & Namespace features.

## installation

Clone the repo, then launch the server

```
npm run server
```

Start another terminal and launch the client app

```
npm start
```

It'll open the demo app in browser, which is a counter with (ultra basic) user management.
redux-full-socket is in `src/` folder. Feel free to try and modify it.

## documentation

### methods

No documentation yet. You can check out the methods exported by `src/redux-full-socket`, and see how they're called in `server/` and `src/`.

### actions

By default, an action will be sent and dispatched to the server asynchronously, while dispatching it to the client store (short cycle). That way, the data is updated in real-time and the state is saved server-side.

You can control how an action travel through the cycle by extending it with these properties :

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| sync | bool | false | If `true`, the action will be sent and dispatched synchronously to the server before being dispatched to the client (long cycle) |
| hide | bool | false | If `true`, the action will not be sent at all to the server. This may be useful for non-critical events |
| broadcast | bool | false | If `true`, the action will be dispatched to every client that shares the same credentials (short cycle for sender, long cycle for receivers) |

