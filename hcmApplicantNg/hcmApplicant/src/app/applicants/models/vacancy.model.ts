export class AtVacancies {


  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public description?: any,
    public dateFrom?: any,
    public dateTo?: any,
    public status?: number,
    public statusName?: string,
    public jobRole?: string,
    public jobWorkingTime?: string,
    public skillsRequirement?: any,
    public languageRequirement?: string,
    public educationRequirement?: string,
    public experienceRequirement?: any,
    public idLocation?: number,
    public idLocationName?: string,
    public idWorkPlace?: number,
    public workPlaceName?: string,
    public createdBy?: string,
    public createdAt?: any,
    public updatedBy?: string,
    public updatedAt?: any,
    public archived?: string,
    public isInternal?: string,
    public employeeResponsibleId?: number,
    public employeeResponsibleName?: string,
    public employeeResponsibleSurname?: string,
    public stateDate?: any,
    public employeeSuperiorId?: number,
    public idOrganizationName?: string,
    public idOrganizationId?: number,
    public numberOfPositions?: number,
    public isFromYearly?: string
  ) {
  }

}
