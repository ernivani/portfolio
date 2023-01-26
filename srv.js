// Serveur
const express = require('express'); // Importation d'Express
const app = express(); // Création de l'application
const port = 80; // Définition du port
app.use(express.static('public')) // Définition des fichiers statiques

// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur tourne sous http://localhost:${port}`);
});

// Page index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

// Si aucune route n'est trouvée on renvoie la page index
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/src/index.html');
});

