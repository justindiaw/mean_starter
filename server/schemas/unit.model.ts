import { ObjectId } from 'bson';
import * as mongoose from 'mongoose';

import { ActiveCheck } from './active-check.model';

export interface Unit extends mongoose.Document {
    firstName: String;
    lastName: String;
    roleId: ObjectId;
    checkInCheck?: ActiveCheck;
}

const unitSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    roleId: {
        type: ObjectId
    }
});
const Unit = mongoose.model<Unit>('Unit', unitSchema);
export default Unit;
