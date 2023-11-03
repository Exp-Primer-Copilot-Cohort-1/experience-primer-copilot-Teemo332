// Create Web Server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Create Web Server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

// Set Static File
app.use(express.static('public'));

// Set Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set View Engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Set Router
const commentRouter = require('./routes/comments');
app.use('/comments', commentRouter);

// Set Router
const indexRouter = require('./routes/index');
app.use('/', indexRouter); app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});