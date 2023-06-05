import { Component, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/core/api/localStorage/local-storage.service';

@Component({
  selector: 'app-stored-image-card',
  templateUrl: './stored-image-card.component.html',
  styleUrls: ['./stored-image-card.component.scss']
})
export class StoredImageCardComponent {
  @Input() id: string = ''
  @Input() title: string = ''
  @Input() url: string = ''
  @Input() timestamp: number = 0
  
  constructor(
    private localStorageService: LocalStorageService
  ) {}

  /**
   * removeGif
   */
  public removeGif() {
    this.localStorageService.delete(this.id)
  }

  /**
   * download
   */
  public async download(url: string) {
    const image = await fetch(url);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const anchor = document.createElement("a");
    anchor.href = imageURL;
    anchor.download = this.title;

    document.body.appendChild(anchor);
    anchor.click();
  }
}
