import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ANATOMICAL_STRUCTURES } from './constants';
import { AnatomicalStructures } from '../models/anatomical-structure-model';

@Injectable({
  providedIn: 'root',
})
export class AnatomicalStructureService {
  constructor(private http: HttpClient) {}

  private apiUrl = ANATOMICAL_STRUCTURES;

  fetchData(): Observable<AnatomicalStructures> {
    return this.http.get<AnatomicalStructures>(this.apiUrl);
  }
}
