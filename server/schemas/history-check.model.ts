import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';


const historyCheckSchema = new Schema({
    unitId: {
        type: mongoose.SchemaTypes.ObjectId
    },
    checkInTime: {
        type: mongoose.SchemaTypes.Date
    },
    checkOutTime: {
        type: mongoose.SchemaTypes.Date
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        default: null
    }
});
const HistoryCheck = mongoose.model('historyCheck', historyCheckSchema);
export default HistoryCheck;
