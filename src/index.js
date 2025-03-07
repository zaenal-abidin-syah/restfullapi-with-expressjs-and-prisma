const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

// midleware json
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello world!!");
});

app.listen(PORT, () => {
  console.log("Express Js Running on : http://localhost:" + PORT);
});
