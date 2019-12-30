import { Types } from 'mongoose';

import HistoryCheck from '../schemas/history-check.model';

export class ExcelService {
    getHitoryChecks(unitId: string) {
        return HistoryCheck.aggregate([
            {
                $project: {
                    unitId: 1,
                    checkInTime: 1,
                    duration: { $subtract: ['$checkOutTime', '$checkInTime'] }
                }
            },
            { $match: { unitId: Types.ObjectId(unitId) } }
        ]);
        // return HistoryCheck.find({ unitId: unitId }, (error) => {
        //     if (error) {
        //         throw error;
        //     }
        // });
    }
}
