import { MongoClient } from 'mongodb';

const CONNECTION_URL = 'mongodb+srv://developer:Ss110110@cluster0-yugia.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = 'manage';
let db: any; let collection;

export function getConnection() {
    return MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        db = client.db(DATABASE_NAME);
        collection = db.collection('teachers');
        collection.findOne({}, (err, result) => console.log(result));
        console.log(`Connected to ${DATABASE_NAME}!`);
    });
}

export default db;
