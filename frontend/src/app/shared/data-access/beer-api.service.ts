import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum BeerType {
  Lager = 'Lager',
  Ale = 'Ale',
  IPA = 'IPA',
  Pilsner = 'Pilsner',
  Bitter = 'Bitter',
}

export interface IBeer extends IBeerBase, IBeerId {}

export interface IBeerBase {
  name: string;
  description: string;
  ibu: number;
  type: BeerType;
}

interface IBeerId {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class BeerApiService {
  private _http = inject(HttpClient);
  private readonly _apiUrlBase = 'http://localhost:5000/api';

  getBeerList(): Observable<IBeer[]> {
    return this._http.get<IBeer[]>(`${this._apiUrlBase}/beersList`);
  }

  getBeer(id: number): Observable<IBeer> {
    return this._http.get<IBeer>(`${this._apiUrlBase}/beer/${id}`);
  }

  addBeerToList(beer: IBeerBase): Observable<unknown> {
    return this._http.post<undefined>(`${this._apiUrlBase}/addBeer`, beer);
  }

  editBeer(id: number, beer: IBeer): Observable<unknown> {
    return this._http.put<undefined>(
      `${this._apiUrlBase}/editBeer/${id}`,
      beer
    );
  }

  deleteBeer(id: number): Observable<unknown> {
    return this._http.delete<undefined>(`${this._apiUrlBase}/deleteBeer/${id}`);
  }
}
