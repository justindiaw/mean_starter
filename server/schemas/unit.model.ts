import { ObjectId } from 'bson';
import * as mongoose from 'mongoose';

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
const Unit = mongoose.model('Unit', unitSchema);
export default Unit;
