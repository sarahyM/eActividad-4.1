const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Para servir archivos estáticos

app.get('/api/search/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const response = await axios.get(`https://api.github.com/search/users?q=${username}`);
        const users = response.data.items.slice(0, 3).map(user => ({
            avatar_url: user.avatar_url,
            login: user.login,
            html_url: user.html_url,
            company: user.company || 'N/A',
            public_repos: user.public_repos
        }));
        res.json(users);
    } catch (error) {
        res.status(500).send('Error fetching data from GitHub API');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});