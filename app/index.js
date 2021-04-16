const approuter = require("@sap/approuter");
const request = require("request");

let ar = approuter();

ar.beforeRequestHandler.use("/userinfo", (req, res) => {
    if (!req.user) {
      res.statusCode = 403;
      res.end("Missing JWT Token");
    }

    var options = {
      method: "GET",
      url: req.user.token.oauthOptions.url+"/userinfo",
      headers: {
        Authorization: "Bearer " + req.user.token.accessToken,
      },
    };
    request(options, function (error, response) {
      if (error) {
        res.statusCode = 500;
        res.end("unavailable user information");
      };
      res.end(response.body);
    });
  });

  ar.start();