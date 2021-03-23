# http-mock

> Mock an endpoint by sending your response shape as request headers 🤯

## The Problem

You want to mock an HTTP endpoint but you need to configure your mocked data dynamically in an easy, programmatic, way. This means you don't want to pay for it, you don’t want a dashboard (or GUI, or admin panel), or have to create an account with some service.

## This Solution

_http-mock_ is a node.js server that returns whatever data you tell it to return. You pass the data as custom headers:

```
response-body: <plaintext|stringified JSON>
response-headers: <stringified JSON>
```

## Examples

```sh
curl -X GET \
  https://httpmock.app/users/ewolfe \
  -H 'response-body: {"followers": 9001, "etc": "anything you want"}' \
  -H 'response-headers: {"Content-Type":"application/json"}'
```

or

```js
fetch("https://httpmock.app/users/ewolfe", {
  headers: {
    "response-body": '{"followers": 9001, "etc": "anything you want"}',
    "response-headers": '{"Content-Type":"application/json"}',
  },
  method: "GET",
  mode: "cors",
});
```

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
