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
const server = http.createServer((req, res) => {
  if ((req.url = "/")) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<p>Home page</p>");
    res.end();
  }

  if (req.url == "/data") {
    //check the URL of the current request
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(JSON.stringify({ message: "About" }));
  }
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
