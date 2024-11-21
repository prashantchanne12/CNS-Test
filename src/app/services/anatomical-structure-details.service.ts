import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ANATOMICAL_STRUCTURE_DETAILS_URL } from './constants';
import {
  StructureDetails,
  StructureDetailsResponse,
} from '../models/anatomical-structure-detail-model';

@Injectable({
  providedIn: 'root',
})
export class AnatomicalStructureDetailsService {
  constructor(private http: HttpClient) {}

  private apiUrl = ANATOMICAL_STRUCTURE_DETAILS_URL;

  fetchDetails(iri: string): Observable<StructureDetails> {
    return this.http.get<StructureDetailsResponse>(`${this.apiUrl}${iri}`).pipe(
      map((data: StructureDetailsResponse) => {
        return {
          name: data._embedded.terms[0].label,
          description: data._embedded.terms[0].description[0],
          iri: data._embedded.terms[0].iri,
          ontologyLink: data._embedded.terms[0].obo_id,
        };
      })
    );
  }
}
