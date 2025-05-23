const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const adoptions = require('./routes/adoptions.js');
app.use('/adoptions', adoptions);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
