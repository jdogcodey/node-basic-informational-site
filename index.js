// const http = require("http");
// const url = require("url");
// const fs = require("fs");

// http
//   .createServer(function (req, res) {
//     const q = url.parse(req.url, true);
//     let filename = "." + q.pathname;
//     if (q.pathname === "/") {
//       filename = "./index.html";
//     } else {
//       filename += ".html";
//     }

//     fs.readFile(filename, function (err, data) {
//       if (err) {
//         // Serve the custom 404.html file if the requested file is not found
//         fs.readFile("404.html", function (error, errorData) {
//           if (error) {
//             res.writeHead(404, { "Content-Type": "text/html" });
//             return res.end("404 Not Found"); // Fallback if 404.html is missing
//           }
//           res.writeHead(404, { "Content-Type": "text/html" });
//           res.write(errorData);
//           return res.end();
//         });
//       } else {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.write(data);
//         return res.end();
//       }
//     });
//   })
//   .listen(8080);

const express = require("express");
const app = express();

const root = "/home/jdubuntu/repos/node-basic-informational-site";

app.get("/", (req, res) =>
  res.sendFile("index.html", {
    root: root,
  })
);

app.get("/about", (req, res) => res.sendFile("about.html", { root: root }));

app.get("/contact-me", (req, res) =>
  res.sendFile("contact-me.html", { root: root })
);

app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: root });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App running on PORT:${PORT}`);
});
