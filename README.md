# http-mock

> On the fly HTTP mocking server

## The Problem

You want to mock an HTTP endpoint, maybe in a test file or in a design library tool like [Storybook](https://storybook.js.org/). You also don't want to sign up for a service. Most importantly, you actually want a real network request to fire instead of having the request be mocked in memory.

## This Solution

_http-mock_ provides a server and a configuration tool that runs in the browser.

### Server

https://httpmock.app/ is a (node.js) server that's freely accessible. All requests return exactly the data you tell it to return. This is done via custom request headers that the server introspects and uses for the response:

```
response-body: <plaintext|stringified JSON>
response-headers: <stringified JSON>
response-status: <integer>
```

```sh
curl -X GET \
  https://httpmock.app/users/ewolfe \
  -H 'response-body: {"followers": 9001, "etc": "anything you want"}' \
  -H 'response-headers: {"Content-Type":"application/json"}' \
  -H 'response-status: 200'
```

or

```js
fetch("https://httpmock.app/users/ewolfe", {
  headers: {
    "response-body": '{"followers": 9001, "etc": "anything you want"}',
    "response-headers": '{"Content-Type":"application/json"}',
    "response-status": 200,
  },
  method: "GET",
  mode: "cors",
});
```

You can make a request to any path you would like `https://httpmock.app/<anything/you/want>`.

![Alt text](/examples/demo.gif "demo")

### Configuration Tool

The configuration tool IS NOT an http client even though it might look like one.

```js
import { storiesOf } from "@storybook/react";
import React from "react";
import httpMock from "http-mock";

import CheckingBalance from "./index.js";

storiesOf("Components/CheckingBalance", module).add("default", () => {
  httpMock.get("/balance?account=123", {
    body: {
      balance: "$1.00",
    },
  });

  return <CheckingBalance account={123} />;
});
```

In this scenarion we're imagining that our `CheckingBalance` component makes a network request to an endpoint `/balance?account=123` on `componentDidMount` or similar, but in Storybook we won't actually have a session to complete this request. So, before our component actually mounts and renders we setup our httpMock. Underneath the hood, this works by intercepting requests and forwarding them to https://httpmock.app/ with the appropriate headers that we saw above.

## Roadmap

### 1. JavaScript fetch interceptor (coming soon)

Imagine a scenario where you want to intercept a network request in the browser and automatically send it to `https://httpmock.app/users/ewolfe` instead of `https://your-domain.com/users/ewolfe`.

[https://storybook.js.org/](https://storybook.js.org/) would be a great fit for this.

For example:

```js
storiesOf("Avatar", module).add("default", () => {
  httpMock.get("/users/ewolfe", {
    body: {
      followers: 9001,
      etc: "anthing you want",
    },
  });

  // <Avatar /> would normally make a request to https://your-domain.com/users/ewolfe
  // But because we’ve added the `httpMock` method above, it will automatically get
  // redirected to https://httpmock.app/users/ewolfe and return the body we configured
  return <Avatar username="ewolfe" />;
});
```

### 2. Website

[https://httpmock.app](https://httpmock.app) should have a landing page of some sort.

### 3. Community contributions

If you think a companion library might be helpful in other langes then please make one and reach out! I’d love to add it to this page.

## License

MIT
