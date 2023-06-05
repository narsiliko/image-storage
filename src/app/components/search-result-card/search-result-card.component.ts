import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LocalStorageService } from 'src/app/core/api/localStorage/local-storage.service';

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss']
})
export class SearchResultCardComponent {
  @Input() id: string = ''
  @Input() title: string = ''
  @Input() url: string = ''

  @Output() addedImageId: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private localStorageService: LocalStorageService
  ) {}

  /**
   * addGif
   */
  public addGif(): void {
    this.localStorageService.add({id: this.id, title: this.title, url: this.url})
    this.addedImageId.emit(this.id)
  }
}
