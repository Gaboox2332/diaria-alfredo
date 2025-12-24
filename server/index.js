const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

// Setup for Vercel Support (Export app)
// Only listen if not running in Vercel/Serverless environment or if triggered directly
if (require.main === module) {
    // Run initialization script if standalone
    require('./init_db'); 
    
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
}

module.exports = app;
