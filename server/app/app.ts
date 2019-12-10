import { Server } from '@overnightjs/core';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { MongoClient } from 'mongodb';

import { CONNECTION_URL, DATABASE_NAME } from '../dbconfig';
import * as controllers from './controllers';

export default class App extends Server {

    public app: express.Application;

    constructor() {
        super(true);
        // this.app = express();
        this.initDatabase(this.config.bind(this));
    }

    start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Express server listening on port ${port}...`);
        });
    }

    private config(db: any): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.get('/test', (request, response) => {
            db.collection('teachers')
                .find({})
                .toArray((error, result) => {
                    response.send(result);
                });
        });
    }


    private initDatabase(config: Function): void {
        MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
            if (error) {
                throw error;
            }
            const db = client.db(DATABASE_NAME);
            console.log(`Connected to database: ${DATABASE_NAME}!`);
            config(db);
        });
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }
}
