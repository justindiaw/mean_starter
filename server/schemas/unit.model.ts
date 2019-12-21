import { ObjectId } from 'bson';
import * as mongoose from 'mongoose';

import ActiveCheck from './active-check.model';

export interface Unit extends mongoose.Document {
    firstName: String;
    lastName: String;
    role: ObjectId;
    checkInCheck?: ObjectId;
}

const unitSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    activeCheck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActiveCheck'
    }
});

unitSchema.pre('remove', function (next) {
    ActiveCheck.remove({ unitId: this._id }).exec();
    next();
});

const Unit = mongoose.model<Unit>('Unit', unitSchema);
export default Unit;
