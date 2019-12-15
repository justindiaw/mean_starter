import { Unit } from '../models/unit';

export class LoadUnits {
  public static readonly type = '[OverviewState] Load Teacher Overview';
  constructor() { }
}

export class AddUnit {
  public static readonly type = '[OverviewState] Add New Teacher';
  constructor(public unit: Unit) { }
}

export class DeleteUnit {
  public static readonly type = '[OverviewState] Delete Teacher';
  constructor(public unit: Unit) { }
}

export class UpdateUnit {
  public static readonly type = '[OverviewState] Update Teacher';
  constructor(public unit: Unit) { }
}
