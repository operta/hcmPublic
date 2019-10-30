import {DmDocumentLinks} from '../models/document-link.model';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../environments/constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DmDocumentLinksService {

    private resourceUrl = SERVER_API_URL + 'api/dm-document-links';

    constructor(private http: HttpClient) {
    }

    createBlob(dmDocumentLinks: DmDocumentLinks): Observable<DmDocumentLinks> {
        const copy = Object.assign({}, dmDocumentLinks);
        return this.http.post<DmDocumentLinks>(`${this.resourceUrl}/blob`, copy);
    }

}
