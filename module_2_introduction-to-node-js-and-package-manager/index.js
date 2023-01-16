/**
 * 3 types of modules in node.js:
 * 1. local
 * 2. core
 * 3. third party
 */

// local modules:
const { sum } = require("./sum");
sum(10, 2);

// core modules:

// raw node.js server:
const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // if ((req.url = "/")) {
  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.write("<p>Home page</p>");
  //   res.end();
  // }
  // if (req.url == "/data") {
  //   //check the URL of the current request
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify({ message: "About" }));
  // }

  // for url core modules start:
  // const address = "http://localhost:8080/default.html?year=2022&month=December";

  // const parseUrl = url.parse(address, true);
  // console.log(parseUrl);
  // console.log(parseUrl.query);

  // for url core modules end:

  // for file system:
  // asynchronous way file system:
  // fs.readFile("data.txt", (err, data) => {
  //   if (err) {
  //     res.write("Error occured reading the data.txt file");
  //     res.end();
  //   } else {
  //     res.write(data);
  //     res.end();
  //   }
  // });

  // asynchronous way to write or create any file:
  fs.writeFile("data1.txt", "Created data1.txt file", (err) => {
    if (err) {
      res.write("Error occured writing the data1.txt file");
      res.end();
    } else {
      res.write("Successfully created data1.txt file");
      res.end();
    }
  });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
