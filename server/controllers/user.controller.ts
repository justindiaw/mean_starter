import { Controller, Delete, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

import Unit from '../schemas/unit.model';
import User, { IUser } from '../schemas/user.model';

@Controller('api/user')
export class UserController {

    @Post('add-user')
    addUser(req: Request, res: Response) {
        try {
            const user = new User(req.body);
            user.save();
            const token = user.generateAuthToken();
            res.status(201).send({ user, token });
        } catch (error) {
            res.status(400).send(error);
        }
    }

    @Post('login')
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findByCredentials(email, password) as IUser
                ;
            if (!user) {
                res.status(401).send('Login failed! Check authentication credentials');
            }
            const token = await user.generateAuthToken();
            res.send({ user, token });
        } catch (error) {
            res.status(400).send(error);
        }
    }


    @Post('')
    addUnit(req: Request, res: Response): void {
        const newUnit = new Unit({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role
        });
        newUnit.save().then(result => {
            res.status(200).json(result);
        });
    }

    @Delete(':id')
    deleteUnit(req: Request, res: Response) {
        Unit.findById(req.params.id, (error, unit) => {
            unit.remove(error2 => {
                if (error2) {
                    res.status(500).send(error2);
                } else {
                    res.status(204).send('removed');
                }
            });
        });
    }
}
