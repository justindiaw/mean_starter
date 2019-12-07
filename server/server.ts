import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { MongoClient } from 'mongodb';

import app from './app/app';

// import db, { getConnection } from './dbconfig';

const PORT = 3000;

// app.use(bodyParser.json());
// app.use(cors());
const CONNECTION_URL = 'mongodb+srv://developer:Ss110110@cluster0-yugia.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = 'manage';
let db: any; let collection;
MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        throw error;
    }
    db = client.db(DATABASE_NAME);
    collection = db.collection('teachers');
    collection.findOne({}, (err, result) => console.log(result));
    console.log(`Connected to ${DATABASE_NAME}!`);
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());
    app.listen(PORT, () => {
        console.log('Express server listening on port ' + PORT);
        // getConnection();
    });
    
    app.get('/test', (request, response) => {
        const result =  db.collection('teachers')
            .find({})
            .toArray((error, result) => {
                console.log(result);
                response.send(result);
            });
    });
});


