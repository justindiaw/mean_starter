import { Server } from '@overnightjs/core';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';

import * as controllers from '../controllers';
import { CONNECTION_URL } from '../dbconfig';

export default class App extends Server {

    public app: express.Application;

    constructor() {
        super(true);
        // this.app = express();
        this.config();
        this.initDatabase();
    }

    start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Express server listening on port ${port}...`);
        });
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        // this.app.get('/test', (request, response) => {
        //     db.collection('teachers')
        //         .find({})
        //         .toArray((error, result) => {
        //             response.send(result);
        //         });
        // });
    }


    private initDatabase(): void {
        // mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        //     if (error) {
        //         throw error;
        //     }
        //     const db = client.db(DATABASE_NAME);
        //     console.log(`Connected to database: ${DATABASE_NAME}!`);
        //     config(db);
        // });
        mongoose.connect(CONNECTION_URL);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
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
