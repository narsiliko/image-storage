import { Component, ElementRef, Output, Renderer2, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GiphyService } from 'src/app/core/api/giphy/giphy.service';

import { SearchGifsResponse } from 'src/app/core/api/giphy/giphy';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss']
})
export class ImageSearchComponent {
  private searchResultInitial: SearchGifsResponse = {
    data: [],
    meta: {
      status: 0,
      msg: '',
      response_id: ''
    },
    pagination: {
      total_count: 0,
      count: 0,
      offset: 0
    }
  }

  public query: string = ''
  public query$: Subject<string> = new Subject()
  public searchResult: SearchGifsResponse = this.searchResultInitial
  public isSearching: boolean = false
  public isEmpty: boolean = false

  @ViewChild('search') search!: ElementRef

  @Output()
  get isSearchOpen(): boolean {
    return this.query.length > 0 && this.searchResult.data.length > 0 || this.isSearching || this.isEmpty
  }

  constructor(
    private giphyService: GiphyService,
    private renderer2: Renderer2
  ) {
    this.renderer2.listen('window', 'click', (event: MouseEvent) => {
      if (!this.search?.nativeElement.contains(event.target as Node)) {
        this.searchResult = this.searchResultInitial
      }
    })
  }

  ngOnInit() {
    addEventListener('keydown', this.keydownListener.bind(this))

    this.query$
      .pipe(
        debounceTime(300)
      )
      .subscribe(_ => {
        this.searchGifs()
      })
  }

  ngOnDestroy() {
    removeEventListener('keydown', this.keydownListener.bind(this))
  }

  /**
   * clearSearch
   */
  public clearSearch(): void {
    this.query = ''
    this.searchResult = this.searchResultInitial  
  }

  /**
   * filterSearchResult
   */
  public filterSearchResult(id: string): void {
    setTimeout(() => {
      this.searchResult.data = this.searchResult.data.filter(image => image.id !== id)
    }, 0)
  }

  private searchGifs(): void {
    this.isEmpty = false
    this.searchResult = this.searchResultInitial

    if (this.query.length > 0) {
      this.isSearching = true
      
      this.giphyService.searchGifs(this.query)
        .subscribe(result => {
          this.searchResult = result
          this.isSearching = false
          if (result.data.length === 0) {
            this.isEmpty = true
          }
        })
    }
  }

  private keydownListener(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchResult = this.searchResultInitial
      this.isEmpty = false
    }
  }
}
