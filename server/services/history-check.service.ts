import HistoryCheck from '../schemas/history-check.model';

export class HistoryCheckService {
    getHitoryChecks(unitId: string) {
        return HistoryCheck.find({ unitId: unitId }, (error) => {
            if (error) {
                throw error;
            }
        });
    }
}
