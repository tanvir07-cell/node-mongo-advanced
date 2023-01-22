const http = require("http");
const fs = require("fs");

// creating a server using node.js:
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(202, { "Content-Type": "text/html" });
    //   res.write();
    return res.end("<h1>Welcome to Full Stack Development</h1>");
  } else if (req.url == "/read") {
    fs.readFile("first.txt", (err, data) => {
      if (err) {
        res.write("Error occured while reading first.txt");
        res.end();
      } else {
        res.write("Successfully read first.txt");
        res.end();
      }
    });
  } else if (req.url == "/write") {
    fs.writeFile("second.txt", "I am a pull stack developer !!! 🤣", (err) => {
      if (err) {
        res.write("Error occured while writing second.txt");
        res.end();
      } else {
        res.write("Successfully written second.txt");
        res.end();
      }
    });
  } else if (req.url == "/append") {
    fs.appendFile("first.txt", "No! It will be full not pull ! 😑", (err) => {
      if (err) {
        res.write("Error occured while appending first.txt");
        res.end();
      } else {
        res.write("Successfully appended first.txt");
        res.end();
      }
    });
  }

  //   delete the second.txt file:
  else if (req.url == "/delete")
    fs.unlink("second.txt", () => {
      console.log("Second file deleted!");
      res.end("successfully deleted second.txt");
    });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
