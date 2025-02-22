import express, {Express} from 'express' // Import the express library
import path from 'path';
import { circoscrizioni, generalInfo, quartieri, session, sondaggi, voti} from './routes';
import { BASE_URL, RESPONSE_MESSAGES } from './variables';
import { checker } from './utils/token';
// To access the database connection, use db.mongoose for the mongoose object and db.schemas for a object containing the schemas

const app: Express = express(); // Create an express app

app.use(express.json());                                                // Use the express.json middleware to parse JSON bodies
app.use(express.urlencoded({extended: true}));                          // Use the express.urlencoded middleware to parse URL-encoded bodies

/* Debug logs Privacy goes brrrr */
/* app.all('*', (req, res, next) => {
    console.log(`Request @ ${new Date().toISOString()}`);
    console.log(`URI: ${req.url} method: ${req.method}`);
    console.log(`IP: ${req.ip}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    if(req.body) console.log(`Body: ${JSON.stringify(req.body)}`);
    
    next();
});*/

app.route(BASE_URL + '/').get((req, res) => {                                      // Define a route for the root path
    res.send('Hello World!');                                                      // Send "Hello World!" as a response
});

// Imposto il router per le circoscrizioni
app.use(BASE_URL + '/circoscrizioni', circoscrizioni);

// Imposto il router per le circoscrizioni
app.use(BASE_URL + '/quartieri', quartieri);

// Imposto il router per le sessioni
app.use(BASE_URL + '/session', session);

// Imposto il router per le informazioni generali
app.use(BASE_URL + '/generalInfo', generalInfo);



// Imposto l'uso del middleware checker per controllare i token di autenticazione, tutte le route dopo questa riga eseguiranno il controllo del token per assicurarsi che gli utenti siano autenticati

// Imposto il router per i voti
app.use(BASE_URL + '/voti', checker, voti);

// Imposto il router per i sondaggi
app.use(BASE_URL + '/sondaggi', checker, sondaggi);

app.use('/',express.static('./dist/client'));

// Dato che è una app Vue, tutte le route devono essere gestite dal client se non sono sate gestite dal server prima, inoltre se la route rispetta la BASE_URL, allora deve essere gestita dal server tramite 404
app.all(BASE_URL+'/*', (req, res) => {
    res.status(404).json({code: 404, message: RESPONSE_MESSAGES[404], details: 'Route not found'});
});

app.all('*', (req, res) => {
    res.sendFile(path.resolve('./dist/client/index.html'));
});

export default app; // Export the app object