import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Request, Response } from 'express';

import ActiveCheck from '../schemas/active-check.model';
import Unit from '../schemas/unit.model';

@Controller('api/units')
export class UnitController {

    @Get('')
    getUnits(req: Request, res: Response): void {
        Unit.find({}).then(units => {
            ActiveCheck.find({}).then(activeChecks => {
                units.forEach(unit => {
                    const checkInCheck = activeChecks.find(activeCheck => activeCheck.unitId === unit._id);
                    if (checkInCheck) {
                        console.log(checkInCheck);
                        unit.checkInCheck = checkInCheck;
                    }
                });
                res.status(200).json(units);
            });
        });
    }

    @Put(':id')
    private putUnit(req: Request, res: Response) {
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
    private addUnit(req: Request, res: Response): void {
        const newUnit = new Unit({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roleId: req.body.roleId
        });
        newUnit.save().then(result => {
            res.status(200).json(result);
        });
    }

    @Delete(':id')
    private deleteUnit(req: Request, res: Response) {
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
