import { Types } from 'mongoose';

import HistoryCheck from '../schemas/history-check.model';

export class HistoryCheckService {
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
    }
}
