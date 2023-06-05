import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, delay, map, throwError } from 'rxjs';

import { LocalStorageService } from '../localStorage/local-storage.service';

import { SearchGifsResponse } from './giphy';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  private filterResponse(response: SearchGifsResponse) {
    const storedImagesIds: string[] = this.localStorageService.read().reduce((acc: string[], image) => [...acc, image.id], [])

    return {
      data: response.data.filter(image => !storedImagesIds.includes(image.id)),
      meta: response.meta,
      pagination: response.pagination
    }
  }

  /**
   * searchGifs
   */
  public searchGifs(q: string): Observable<SearchGifsResponse> {
    return this.http.get<SearchGifsResponse>('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: 'jj5xQx7FGbz9cukapEp4PHJ5PL9YJLEg',
        q,
        limit: 50 /* Max limit for beta keys */
      }
    }).pipe(
      map(this.filterResponse.bind(this)),
      catchError(err => throwError(err))
    )
  }

  /**
   * searchGifsMock
   * @deprecated (only for develop purposes)
   */
  public searchGifsMock(_: string): Observable<SearchGifsResponse> {
    return this.http.get<SearchGifsResponse>('/assets/giphy.json')
      .pipe(
        map(this.filterResponse.bind(this)),
        delay(1000),
        catchError(err => throwError(err))
      )
  }
}
