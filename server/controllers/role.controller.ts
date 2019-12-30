import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Request, Response } from 'express';

import RoleModel from '../schemas/role.model';
import UnitModel from '../schemas/unit.model';

@Controller('api/roles')
export class RoleController {

    @Get('')
    getRoles(req: Request, res: Response): void {
        RoleModel.find({}).then(
            result => {
                res.status(200).json(result);
            }
        );
    }

    @Put(':id')
    putUnit(req: Request, res: Response) {
        UnitModel.findById(req.params.id, (err, unit) => {
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
        const newUnit = new UnitModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        newUnit.save().then(result => {
            res.status(200).json(result);
        });
    }

    @Delete(':id')
    deleteUnit(req: Request, res: Response) {
        const unitId = req.params.id;
        UnitModel.findById(unitId, (error, unit) => {
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
