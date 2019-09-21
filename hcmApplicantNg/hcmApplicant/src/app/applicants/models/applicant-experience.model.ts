export class AtApplicantsExperience  {
  constructor(
    public id?: number,
    public idApplicantId?: number,
    public company?: string,
    public position?: string,
    public location?: number,
    public locationName?: string,
    public dateFrom?: any,
    public dateTo?: any,
    public ongoing?: string,
  ) {
  }
}
