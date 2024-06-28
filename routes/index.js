const url = require("url");

const express = require("express");
const router = express.Router();
const needle = require("needle");

// GET ENVIRONMENT VARIABLES.
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

router.get("/", async (req, res) => {
  try {
    // console.log(url.parse(req.url, true).query);

    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    // console.log(params);

    // LOG THE REQUEST MADE TO THE PUBLIC API.
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }

    const apiResponse = await needle("get", `${API_BASE_URL}?${params}`);
    // console.log(apiResponse);
    const data = apiResponse.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
