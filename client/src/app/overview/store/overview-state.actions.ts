import { Unit } from '../models/unit';

export class LoadUnits {
  public static readonly type = '[Overview] Load Teacher Overview';
  constructor() { }
}

export class AddUnit {
  public static readonly type = '[Overview] Add New Teacher';
  constructor(public unit: Unit) { }
}

export class DeleteUnit {
  public static readonly type = '[Overview] Delete Teacher';
  constructor(public unit: Unit) { }
}

export class UpdateUnit {
  public static readonly type = '[Overview] Update Teacher';
  constructor(public unit: Unit) { }
}
