import * as mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name: {
        type: String
    }
});
const RoleModel = mongoose.model('Role', roleSchema);
export default RoleModel;
