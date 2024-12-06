const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    if (q.pathname === "/") {
      filename = "./index.html";
    } else {
      filename += ".html";
    }

    fs.readFile(filename, function (err, data) {
      if (err) {
        // Serve the custom 404.html file if the requested file is not found
        fs.readFile("404.html", function (error, errorData) {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found"); // Fallback if 404.html is missing
          }
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(errorData);
          return res.end();
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
