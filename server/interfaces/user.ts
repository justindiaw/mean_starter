import { Document } from 'mongoose';

export interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    tokens: [{ token: Token }];
}

export interface Token {
    type: string;
    required: boolean;
}
