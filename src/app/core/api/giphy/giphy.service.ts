import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ISearchGifsResponse } from './giphy';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public searchGifs(q: string): Observable<ISearchGifsResponse> {
    return this.http.get<ISearchGifsResponse>('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: 'jj5xQx7FGbz9cukapEp4PHJ5PL9YJLEg',
        q,
        limit: 20
      }
    }).pipe(
      catchError(err => throwError(err))
    )
  }

  public searchGifsMock(q: string): Observable<ISearchGifsResponse> {
    return this.http.get<ISearchGifsResponse>('/assets/giphy.json')
      .pipe(
        map(response => {
          const storedImagesIds: string[] = this.localStorageService.read().reduce((acc: string[], image) => [...acc, image.id], [])

          return {
            data: response.data.filter(image => !storedImagesIds.includes(image.id)),
            meta: response.meta,
            pagination: response.pagination
          }
        }),
        catchError(err => throwError(err))
      )
  }
}
