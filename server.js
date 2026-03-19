const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route to fetch website
app.post("/browse", async (req, res) => {
    let url = req.body.url;

    try {
        // Add http if missing
        if (!url.startsWith("http")) {
            url = "http://" + url;
        }

        const response = await axios.get(url);

        res.send(response.data);
    } catch (error) {
        res.send(`
            <h2 style="color:red;">Invalid URL or Unable to Fetch Website</h2>
            <p>Please check the URL and try again.</p>
            <a href="/">Go Back</a>
        `);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
