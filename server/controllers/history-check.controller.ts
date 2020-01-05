import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

import { HistoryCheckItem } from '../interfaces';
import ActiveCheck from '../schemas/active-check.model';
import HistoryCheck from '../schemas/history-check.model';
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

    @Get(':unitId/:year/:month?/:day?')
    getHitoryChecksReport(req: Request, res: Response): void {
        this.historyCheckService.getHitoryChecks(req.params.unitId)
            .then((checks: HistoryCheckItem[]) => {
                const workBook = this.excelService.getPersonalReport(checks);
                const tempFilePath = tempfile('.xlsx');
                workBook.xlsx.writeFile(tempFilePath).then(() => {
                    res.status(200).sendFile(tempFilePath, error => console.log(error));
                });
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
