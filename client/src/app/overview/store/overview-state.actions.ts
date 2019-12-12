import { TeacherOverview } from '../models/teacher-overview';

export class LoadTeacherOverview {
  public static readonly type = '[OverviewState] Load Teacher Overview';
  constructor() { }
}

export class AddTeacher {
  public static readonly type = '[OverviewState] Add New Teacher';
  constructor(public teacher: TeacherOverview) { }
}

export class DeleteTeacher {
  public static readonly type = '[OverviewState] Delete Teacher';
  constructor(public teacher: TeacherOverview) { }
}

export class UpdateTeacher {
  public static readonly type = '[OverviewState] Update Teacher';
  constructor(public teacher: TeacherOverview) { }
}
