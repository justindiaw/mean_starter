import { Server } from '@overnightjs/core';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';

import * as controllers from '../controllers';
import { CONNECTION_URL, DATABASE_NAME } from '../dbconfig';

export default class App extends Server {

    public app: express.Application;

    constructor() {
        super(true);
        this.config();
        this.initDatabase();
        this.setupControllers();
    }

    start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Express server listening on port ${port}...`);
        });
    }

    private config(): void {
        dotenv.config();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
    }


    private initDatabase(): void {
        mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, dbName: DATABASE_NAME, useUnifiedTopology: true }, error => {
            if (error) {
                console.log(error);
            }
            console.log(`Connected to DB "${DATABASE_NAME}"...`);
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
