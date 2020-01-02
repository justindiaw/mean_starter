import { Types } from 'mongoose';

import HistoryCheckModel from '../schemas/history-check.model';

export class HistoryCheckService {
    getHitoryChecks(unitId: string) {
        return HistoryCheckModel.aggregate([
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
