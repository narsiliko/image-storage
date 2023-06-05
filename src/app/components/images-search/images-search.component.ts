import { Component, ElementRef, Output, Renderer2, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ISearchGifsResponse } from 'src/app/core/api/giphy/giphy';
import { GiphyService } from 'src/app/core/api/giphy/giphy.service';

@Component({
  selector: 'app-images-search',
  templateUrl: './images-search.component.html',
  styleUrls: ['./images-search.component.scss']
})
export class ImagesSearchComponent {
  private searchResultInitial: ISearchGifsResponse = {
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
  public searchResult: ISearchGifsResponse = this.searchResultInitial

  @ViewChild('search') search!: ElementRef

  @Output()
  get isSearchOpen(): boolean {
    return this.query.length > 0 && this.searchResult.data.length > 0
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
        debounceTime(500)
      )
      .subscribe(_ => {
        this.doSearchGifs()
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

  private doSearchGifs(): void {
    this.giphyService.searchGifsMock(this.query)
      .subscribe(result => {
        this.searchResult = result
      })
  }

  private keydownListener(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchResult = this.searchResultInitial
    }
  }
}
