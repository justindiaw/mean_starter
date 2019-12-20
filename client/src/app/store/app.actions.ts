import { SnackBarMessage } from '../model/snack-bar-message';

export class GetRoles {
    public static readonly type = '[app] Load Roles';
    constructor() { }
}

export class OpenSnackBar {
    public static readonly type = '[app] Load Roles';
    constructor(public message: SnackBarMessage) { }
}
