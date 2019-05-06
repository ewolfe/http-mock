const { send } = require("micro");

module.exports = (req, res) => {
  // console.log(req.method);
  res.setHeader("Access-Control-Allow-Origin", "*");

  switch (req.method) {
    // Handle CORS requests
    case "OPTIONS":
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE"
      );
      if (req.headers["access-control-request-headers"]) {
        res.setHeader(
          "Access-Control-Allow-Headers",
          req.headers["access-control-request-headers"]
        );
      }
      send(res, 204);
    // Respond to all other requests
    default:
      // Set response headers
      if (req.headers["response-headers"]) {
        let responseHeaders;
        try {
          responseHeaders = JSON.parse(req.headers["response-headers"]);
        } catch (error) {
          return send(res, 500, {
            error: "Failed parsing 'response-headers'",
            info: error.toString()
          });
        }
        Object.entries(responseHeaders).forEach(keyValuePair => {
          res.setHeader(keyValuePair[0], keyValuePair[1]);
        });
      }

      // Send our response
      send(res, 200, req.headers["response-body"]);
  }
};
