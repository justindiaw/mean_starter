import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

import ActiveCheck from '../schemas/active-check.model';
import HistoryCheck from '../schemas/history-check.model';
import Unit from '../schemas/unit.model';

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
                Unit.findOne({ _id: req.params.unitId }, (error2, unit) => {
                    if (unit) {
                        unit.set('activeCheck', newCheck._id);
                        unit.save().then(() => {
                            newCheck.save().then(result => {
                                res.status(200).json(result);
                            });
                        });
                    }
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
}
