import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Document, Model, model, Schema } from 'mongoose';
import { isEmail } from 'validator';

import { IUserDocument } from '../interfaces/user';

export interface IUser extends IUserDocument {
    generateAuthToken(): any;
}

export interface IUserModel extends Model<IUser> {
    findByCredentials(email: string, password: string): Document;
}

export class UserSchema {

}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Invalid Email']
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user['password'] = await bcrypt.hash(user['password'], 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    const token = jwt.sign({ _id: user._id }, 'haohaoxuexitiantianxiangshang');
    user.tokens = user.tokens.concat({ token });
    // await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid login credentials');
    }
    const isPasswordMatch = await bcrypt.compare(password, user['password']);
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
    }
    return user;
};

const User: IUserModel = model<IUser, IUserModel>('User', userSchema);
export default User;
