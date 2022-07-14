import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { endpoints } from '../api/endpoints';

const apiBase = environment.api.base;

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private characters: any[];
  private characters$: Subject<any[]>;

  constructor(private http: HttpClient) {
    this.characters = [];
    this.characters$ = new Subject();
  }

  /**
   * 
   * @param character from the request
   */
  saveCharacters(characters: any[]) {
    this.characters = [...characters, ...this.characters];
    this.characters$.next(this.characters);
  }

  /**
   * 
   * @returns characters saved as observable
   */
  getCharactersSaved(): Observable<any[]> {
    return this.characters$.asObservable()
  }


  /**
   * 
   * @returns All characters
   */
  getCharacters(page: number) {
    return this.http.get<any[]>(`${apiBase}/${endpoints.characters}?page=${page}&pageSize=6`)
  }

}
