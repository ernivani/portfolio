const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 80;
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Serveur tourne sous http://localhost:${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});


app.use((req, res, next) => {
    // send to index page
    res.status(404).sendFile(__dirname + '/src/index.html');
});




