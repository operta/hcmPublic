import {HttpParams} from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach((key) => {
            if (key !== 'sort' &&
                key !== 'page' &&
                key !== 'size' &&
                key !== 'dateToBenefits' &&
                key !== 'dateFromBenefits' &&
                key !== 'benefitType' &&
                key !== 'idNumber' &&
                key !== 'dutyNumber' &&
                key !== 'entityType' &&
                key !== 'orgName' &&
                key !== 'orgCode' &&
                key !== 'orgType' &&
                key !== 'orgLegalEntity' &&
                key !== 'employeeId' &&
                key !== 'startDate' &&
                key !== 'endDate' &&
                key !== 'stateId' &&
                key !== 'typeId' &&
                key !== 'evaluationFrom' &&
                key !== 'evaluationTo' &&
                key !== 'goalId' &&
                key !== 'dateFrom' &&
                key !== 'dateTo' &&
                key !== 'applicantId' &&
                key !== 'idReward' &&
                key !== 'dateReward' &&
                key !== 'idInjury' &&
                key !== 'idFamily' &&
                key !== 'docName' &&
                key !== 'docType' &&
                key !== 'docValidFrom' &&
                key !== 'docValidTo' &&
                key !== 'idOrgWorkPlace' &&
                key !== 'contractTypeIds' &&
                key !== 'name' &&
                key !== 'employeeId' &&
                key !== 'dueDate' &&
                key !== 'idMentor' &&
                key !== 'position' &&
                key !== 'location' &&
                key !== 'vacancy' &&
                key !== 'strucnaSprema' &&
                key !== 'filijala' &&
                key !== 'applicant' &&
                key !== 'questTypeId' &&
                key !== 'grade' &&
                key !== 'realised' &&
                !!req[key]) {
                options = options.set(key, req[key]);
            }
        });
        if (req.page) {
            options = options.append('page', req.page);
        } else {
            options = options.append('page', <any>0);
        }
        if (req.size) {
            options = options.append('size', req.size);
        } else {
            options = options.append('size', <any>1000000);
        }
        if (req.sort) {
            req.sort.forEach((val) => {
                options = options.append('sort', val);
            });
        }
        if (req.dateToBenefits) {
            options = options.append('date-to', req.dateToBenefits);
        }
        if (req.dateFromBenefits) {
            options = options.append('date-from', req.dateFromBenefits);
        }
        if (req.benefitType) {
            options = options.append('benefit-type', req.benefitType);
        }
        if (req.idNumber) {
            options = options.append('id-number', req.idNumber);
        }
        if (req.dutyNumber) {
            options = options.append('duty-number', req.dutyNumber);
        }
        if (req.entityType) {
            options = options.append('entity-type', req.entityType);
        }
        if (req.orgName) {
            options = options.append('org-name', req.orgName);
        }
        if (req.orgCode) {
            options = options.append('org-code', req.orgCode);
        }
        if (req.orgType) {
            options = options.append('org-type', req.orgType);
        }
        if (req.orgLegalEntity) {
            options = options.append('legal-entity-id', req.orgLegalEntity);
        }
        if (req.employeeId) {
            options = options.append('employee-id', req.employeeId);
        }
        if (req.startDate) {
            options = options.append('start-date', req.startDate);
        }
        if (req.endDate) {
            options = options.append('end-date', req.endDate);
        }
        if (req.stateId) {
            options = options.append('state-id', req.stateId);
        }
        if (req.typeId) {
            options = options.append('type-id', req.typeId);
        }
        if (req.evaluationFrom) {
            options = options.append('evaluation-from', req.evaluationFrom);
        }
        if (req.evaluationTo) {
            options = options.append('evaluation-to', req.evaluationTo);
        }
        if (req.goalId) {
            options = options.append('goal-id', req.goalId);
        }
        if (req.dateFrom) {
            options = options.append('date-from', req.dateFrom);
        }
        if (req.dateTo) {
            options = options.append('date-to', req.dateTo);
        }
        if (req.applicantId) {
            options = options.append('applicant-id', req.applicantId);
        }
        if (req.idReward) {
            options = options.append('id-reward', req.idReward);
        }
        if (req.dateReward) {
            options = options.append('date-reward', req.dateReward);
        }
        if (req.idInjury) {
            options = options.append('id-injury', req.idInjury);
        }
        if (req.idFamily) {
            options = options.append('id-family', req.idFamily);
        }
        if (req.docName) {
            options = options.append('doc-name', req.docName);
        }
        if (req.docType) {
            options = options.append('doc-type', req.docType);
        }
        if (req.docValidFrom) {
            options = options.append('doc-valid-from', req.docValidFrom);
        }
        if (req.docValidTo) {
            options = options.append('doc-valid-to', req.docValidTo);
        }
        if (req.idOrgWorkPlace) {
            options = options.append('id-org-work-place', req.idOrgWorkPlace);
        }
        if (req.contractTypeIds) {
            options = options.append('id-contract-types', req.contractTypeIds);
        }
        if (req.name) {
            options = options.append('name', req.name);
        }
        if (req.dueDate) {
            options = options.append('due-date', req.dueDate);
        }
        if (req.idMentor) {
            options = options.append('id-mentor', req.idMentor);
        }
        if (req.position) {
            options = options.append('work-place', req.position);
        }
        if (req.location) {
            options = options.append('applicant-city', req.location);
        }
        if (req.vacancy) {
            options = options.append('vacancy', req.vacancy);
        }
        if (req.strucnaSprema) {
            options = options.append('qualification', req.strucnaSprema);
        }
        if (req.filijala) {
            options = options.append('organization', req.filijala);
        }
        if (req.applicant) {
            options = options.append('applicant', req.applicant);
        }
        if (req.questTypeId) {
            options = options.append('questionnaire-type', req.questTypeId);
        }
        if (req.grade) {
            options = options.append('grade', req.grade);
        }
        if (req.realised) {
            options = options.append('realised', req.realised);
        }

    } else {
        options = options.append('page', <any>0);
        options = options.append('size', <any>1000000);
    }
    return options;
};
