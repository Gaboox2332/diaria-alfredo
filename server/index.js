const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: [
        'https://diaria-alfredo.vercel.app',
        'http://localhost:5173',
        'http://127.0.0.1:5173'
    ],
    credentials: true
}));
app.use(bodyParser.json());

app.use('/api', routes);

// Setup for Vercel Support (Export app)
// Initialize Database (Migrations)
require('./init_db');

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
}

module.exports = app;
