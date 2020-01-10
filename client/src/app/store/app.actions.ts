import { SnackBarMessage } from '../model/snack-bar-message';

export class Login {
    public static readonly type = '[app] Login';
    constructor() { }
}

export class GetRoles {
    public static readonly type = '[app] Load Roles';
    constructor() { }
}

export class OpenSnackBar {
    public static readonly type = '[app] Load Roles';
    constructor(public message: SnackBarMessage) { }
}
