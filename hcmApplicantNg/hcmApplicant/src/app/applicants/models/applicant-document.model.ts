
export class AtApplicantsDocuments {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public dateCreated?: any,
    public validFrom?: any,
    public validTo?: any,
    public idDocumentLink?: number,
    public idDocumentLinkFilePath?: string,
    public idDocumentBlobContentType?: string,
    public idDocumentBlob?: any,
    public idDocumentType?: number,
    public idApplicantId?: number,
    public createdBy?: string,
    public createdAt?: any,
    public updatedBy?: string,
    public updatedAt?: any,
  ) {
  }
}
