const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/search', async (req, res) => {
    const { subreddit, keyword } = req.query;

    try {
        const response = await axios.get(`https://www.reddit.com/r/${subreddit}/search.json`, {
            params: {
                q: keyword,
                sort: 'relevance',
                limit: 10
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from Reddit API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

