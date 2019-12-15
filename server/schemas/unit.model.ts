import * as mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
});
const Unit = mongoose.model('Unit', unitSchema, 'units');
export default Unit;
