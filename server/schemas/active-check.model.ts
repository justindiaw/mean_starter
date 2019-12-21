import { ObjectId } from 'bson';
import * as mongoose from 'mongoose';

export interface ActiveCheck extends mongoose.Document {
    unitId: ObjectId;
    checkInTime: Date;
    highTemp: Date;
}

const activeCheckSchema = new mongoose.Schema({
    unitId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Unit'
    },
    checkInTime: {
        type: mongoose.SchemaTypes.Date
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        default: null
    }
});
const ActiveCheck = mongoose.model<ActiveCheck>('ActiveCheck', activeCheckSchema);
export default ActiveCheck;
