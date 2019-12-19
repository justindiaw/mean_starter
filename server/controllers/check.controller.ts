import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Request, Response } from 'express';

import Role from '../schemas/role.model';
import Unit from '../schemas/unit.model';

@Controller('api/check')
export class RoleController {

    @Get('')
    getRoles(req: Request, res: Response): void {
        Role.find({}).then(
            result => {
                res.status(200).json(result);
            }
        );
    }

    @Put(':id')
    putUnit(req: Request, res: Response) {
        Unit.findById(req.params.id, (err, unit) => {
            if (req.body._id) {
                delete req.body._id;
            }
            for (const property in req.body) {
                if (req.body.hasOwnProperty(property)) {
                    unit[property] = req.body[property];
                }
            }
            unit.save();
            res.json(unit);
        });
    }

    @Post('')
    addUnit(req: Request, res: Response): void {
        const newUnit = new Unit({
            firstName: req.body.firstName,
            lastName: req.body.lastName
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
