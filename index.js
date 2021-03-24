module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  switch (req.method) {
    case "OPTIONS":
      res.setHeader(
        "Access-Control-Allow-Methods",
        req.headers["access-control-request-method"]
      );
      if (req.headers["access-control-request-headers"]) {
        res.setHeader(
          "Access-Control-Allow-Headers",
          req.headers["access-control-request-headers"]
        );
      }
      res.status(204).send("");
      return;
    default:
      if (req.headers["host"] === "httpmock.app") {
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        res.send(
          '<p>Please see <a href="https://github.com/ewolfe/http-mock">https://github.com/ewolfe/http-mock</a> to use httpmock.app programatically.</p>'
        );
        return;
      }
      if (req.headers["response-headers"]) {
        let responseHeaders;
        try {
          responseHeaders = JSON.parse(req.headers["response-headers"]);
        } catch (error) {
          req.status(500).json({
            error: "Failed parsing 'response-headers'",
            info: error.toString(),
          });
          return;
        }
        Object.entries(responseHeaders).forEach((keyValuePair) => {
          res.setHeader(keyValuePair[0], keyValuePair[1]);
        });
      }

      res
        .status(req.headers["response-status"] || 200)
        .send(req.headers["response-body"]);
      return;
  }
};
