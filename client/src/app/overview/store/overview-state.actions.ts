import { TeacherOverview } from '../models/teacher-overview';

export class LoadTeacherOverview {
  public static readonly type = '[OverviewState] Load Teacher Overview';
  constructor() { }
}

export class AddTeacher {
  public static readonly type = '[OverviewState] Add New Teacher';
  constructor(public teacher: TeacherOverview) { }
}
