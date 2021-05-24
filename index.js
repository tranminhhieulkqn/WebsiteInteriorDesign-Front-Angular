// install express server
const path = require('path');
const express = require('express');

const app = express();

// serve only the static files form the dist directory
app.use(express.static('./dist/WebsiteInteriorDesign-Front-Angular'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/WebsiteInteriorDesign-Front-Angular/'}),
);

// start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
