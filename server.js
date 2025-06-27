const express = require('express');
const app = express()
const path = require('path');
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')

//  custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// buildt-in middleware to handle urlencoded form data
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));
app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));


// app.use('/')
app.all(/.*/, (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
})

app.use(errorHandler)

// listening for request, should always be at the end of server.js
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));