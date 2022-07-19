import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable, Subject } from 'rxjs';
import { endpoints } from '../api/endpoints';
import { Data_Character } from '../interfaces/data-character.interface';

const apiBase = environment.api.base;
const PAGE_SIZE = 6;

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
    return this.http.get<Data_Character[]>(`${apiBase}/${endpoints.characters}?page=${page}&pageSize=${PAGE_SIZE}`)
      .pipe(map((resp: any) => {
        const array = resp.map((element: any) => {
          return { name: element.name, gender: element.gender, element: resp.died }
        });
        return array;
      }))
  }

}
