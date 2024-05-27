import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [subreddit, setSubreddit] = useState('');
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/search', {
                params: { subreddit, keyword }
            });
            setResults(response.data.data.children);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    return (
        <div>
            <h1>Reddit Search</h1>
            <input
                type="text"
                placeholder="Subreddit"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
            />
            <input
                type="text"
                placeholder="Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <div>
                {results.map((post, index) => (
                    <div key={index}>
                        <a href={`https://reddit.com${post.data.permalink}`} target="_blank" rel="noopener noreferrer">
                            {post.data.title}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
