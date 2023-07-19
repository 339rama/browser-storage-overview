const http = require("http");

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Set-Cookie", [
    `authcookie=${new Date().toISOString()}`,
    `secret=${new Date().toISOString()}; HttpOnly;`
  ]);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.writeHead(200);
  const response = JSON.stringify({ message: "Success", timestamp: new Date().toISOString() });
  res.end(response);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
