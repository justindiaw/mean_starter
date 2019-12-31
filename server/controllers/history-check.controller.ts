import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

import { HistoryCheck } from '../interfaces';
import ActiveCheckModel from '../schemas/active-check.model';
import HistoryCheckModel from '../schemas/history-check.model';
import { ExcelService, HistoryCheckService } from '../services';

const tempfile = require('tempfile');

@Controller('api/history-check')
export class HistoryCheckController {

    constructor(
        private historyCheckService: HistoryCheckService,
        private excelService: ExcelService
    ) {
        this.historyCheckService = new HistoryCheckService();
        this.excelService = new ExcelService();
    }

    // @Get(':unitId/:year/:month?/:day?')
    // getHistoryChecks(req: Request, res: Response): void {
    //     this.historyCheckService.getHitoryChecks(req.params.unitId)
    //         .then(checks => {
    //             res.status(200).json(checks);
    //         });
    // }

    @Get(':unitId/:year/:month?/:day?')
    getHitoryChecksReport(req: Request, res: Response): void {
        this.historyCheckService.getHitoryChecks(req.params.unitId)
            .then((checks: HistoryCheck[]) => {
                const workBook = this.excelService.getPersonalReport(checks);
                const tempFilePath = tempfile('.xlsx');
                workBook.xlsx.writeFile(tempFilePath).then(() => {
                    res.status(200).sendFile(tempFilePath, error => console.log(error));
                });
            });

    }

    @Post('out/:unitId')
    checkOut(req: Request, res: Response) {
        ActiveCheckModel.findOne({ unitId: req.params.unitId }, (error, check) => {
            if (check) {
                const newHistoryCheck = new HistoryCheckModel({
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
