export class CheckIn {
  static readonly type = '[Check] Check in';
  constructor(public unitId: string) { }
}

export class CheckOut {
  static readonly type = '[Check] Check out';
  constructor(public unitId: string) { }
}
