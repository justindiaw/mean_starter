import { ResponseStatus } from './response-status.enum';

export interface SnackBarMessage {
    text: string;
    statusCode: number;
    statusType: ResponseStatus;
}
