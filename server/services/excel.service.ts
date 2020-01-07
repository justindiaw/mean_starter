import { Workbook } from 'exceljs';

import { IHistoryCheck } from '../interfaces';

export class ExcelService {
    getPersonalReport(historyChecks: IHistoryCheck[]): Workbook {
        const workBook = new Workbook();
        const mainSheet = workBook.addWorksheet('Personal Daily Report');
        mainSheet.columns = [
            { key: '_id', header: '_id' },
            { key: 'unitId', header: 'unitId' },
            { key: 'checkInTime', header: 'checkInTime' },
            { key: 'duration', header: 'duration' }
        ];
        mainSheet.addRows(historyChecks);

        return workBook;
    }
}
