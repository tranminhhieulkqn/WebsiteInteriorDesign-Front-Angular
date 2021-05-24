const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist/WebsiteInteriorDesign-Front-Angular'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/WebsiteInteriorDesign-Front-Angular/' });
});


app.listen(process.env.PORT || 8000);
