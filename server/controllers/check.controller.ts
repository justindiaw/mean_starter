import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

import ActiveCheck from '../schemas/active-check.model';
import HistoryCheck from '../schemas/history-check.model';

@Controller('api/check')
export class CheckController {

    @Post('in/:unitId')
    checkIn(req: Request, res: Response): void {
        const newCheck = new ActiveCheck({
            unitId: req.params.unitId,
            checkInTime: req.body.checkInTime
        });
        ActiveCheck.findOne({ unitId: req.params.unitId }, (error, check) => {
            if (check) {
                res.status(409).send('Already checked in...');
            } else {
                newCheck.save().then(result => {
                    res.status(200).json(result);
                });
            }
        });
    }

    @Post('out/:unitId')
    checkOut(req: Request, res: Response) {
        ActiveCheck.findOne({ unitId: req.params.unitId }, (error, check) => {
            if (check) {

                const newHistoryCheck = new HistoryCheck({
                    unitId: check.unitId,
                    checkInTime: check.checkInTime,
                    checkOutTime: req.body.checkOutTime
                });
                newHistoryCheck.save().then(() => {
                    check.remove(error2 => {
                        if (error2) {
                            res.status(500).send(error2);
                        } else {
                            res.status(204).send('Check out sucessful!');
                        }
                    });
                });

            } else {
                res.status(409).send('Already checked out...');
            }
        });
    }

    // @Get('')
    // getRoles(req: Request, res: Response): void {
    //     Role.find({}).then(
    //         result => {
    //             res.status(200).json(result);
    //         }
    //     );
    // }

    // @Put(':id')
    // putUnit(req: Request, res: Response) {
    //     Unit.findById(req.params.id, (err, unit) => {
    //         if (req.body._id) {
    //             delete req.body._id;
    //         }
    //         for (const property in req.body) {
    //             if (req.body.hasOwnProperty(property)) {
    //                 unit[property] = req.body[property];
    //             }
    //         }
    //         unit.save();
    //         res.json(unit);
    //     });
    // }

    // @Post('')
    // addUnit(req: Request, res: Response): void {
    //     const newUnit = new Unit({
    //         firstName: req.body.firstName,
    //         lastName: req.body.lastName
    //     });
    //     newUnit.save().then(result => {
    //         res.status(200).json(result);
    //     });
    // }

    // @Delete(':id')
    // deleteUnit(req: Request, res: Response) {
    //     Unit.findById(req.params.id, (error, unit) => {
    //         unit.remove(error2 => {
    //             if (error2) {
    //                 res.status(500).send(error2);
    //             } else {
    //                 res.status(204).send('removed');
    //             }
    //         });
    //     });
    // }
}
