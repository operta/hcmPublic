export class AtApplicantsSchools {
  constructor(
    public id?: number,
    public school?: string,
    public dateFrom?: any,
    public dateTo?: any,
    public major?: string,
    public degree?: string,
    public grade?: number,
    public description?: string,
    public link?: string,
    public idQualifcation?: number,
    public idQualificationName?: string,
    public idSchool?: number,
    public idSchoolName?: string,
    public idApplicantId?: number,
    public createdBy?: string,
    public createdAt?: any,
    public updatedBy?: string,
    public updatedAt?: any,
    public ectsPoints?: number
  ) {
  }
}
