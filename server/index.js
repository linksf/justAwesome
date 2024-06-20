// server/index.js

const express = require("express");
const {XMLParser} = require("fast-xml-parser");
const axios = require("axios");

const options = {
    ignoreAttributes: false,
    attributeNamePrefix : "@_"
};

const parser = new XMLParser(options);
const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

//create a get route that takes a parameter of gameTitle, calls the boardgamegeek api, and returns the data
app.get("/games/search/:gameTitle", async (req, res) => {
  const gameTitle = req.params.gameTitle;
  const response = await axios.get(
    `https://boardgamegeek.com/xmlapi/search?search=${gameTitle}`,
    { headers: { 'Referer': 'https://boardgamegeek.com' } }
  );
  let jsonObj = parser.parse(response.data);
  res(jsonObj);
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});