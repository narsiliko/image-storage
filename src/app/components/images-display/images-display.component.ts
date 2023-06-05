import { Component, Input } from '@angular/core';
import { StoredImageRecord, ImageSortField, FieldsAvailableForSort, ImageSortDirection } from 'src/app/core/api/localStorage/local-storage';
import { LocalStorageService } from 'src/app/core/api/localStorage/local-storage.service';

type AvailableIcons = 'arrow-up' | 'arrow-down' | 'dash'

type SortIcons = {
  [key in ImageSortDirection]: AvailableIcons
}

@Component({
  selector: 'app-images-display',
  templateUrl: './images-display.component.html',
  styleUrls: ['./images-display.component.scss']
})
export class ImagesDisplayComponent {
  private draggingIndex?: number
  public query: string = ''
  public storedImages: StoredImageRecord[] = []
  public sortFields: ImageSortField[] = [
    {
      id: 'timestamp',
      name: 'Date added',
      direction: 'none'
    }
  ]
  public sortIcons: SortIcons = {
    asc: 'arrow-up',
    desc: 'arrow-down',
    none: 'dash',
  }

  @Input() isSearchOpen: boolean = false

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.storedImages = this.localStorageService.read()
    this.localStorageService.localStorageListener$.subscribe(data => {
      this.storedImages = data
    })
  }

  /**
   * clearSearch
   */
  public clearSearch(): void {
    this.query = ''    
  }

  /**
   * sortImages
   */
  public sortImages(id: FieldsAvailableForSort) {
    const sortFieldIndex = this.sortFields.findIndex(field => field.id === id)

    if (this.sortFields[sortFieldIndex].direction !== 'asc') {
      this.sortFields[sortFieldIndex].direction = 'asc'
      this.localStorageService.sort(id, 'asc')
    } else {
      this.sortFields[sortFieldIndex].direction = 'desc'
      this.localStorageService.sort(id, 'desc')
    }
  }

  /**
   * imageDragStart 
   */
  public imageDragStart(fromIndex: number): void {
    this.draggingIndex = fromIndex
  }
  
  /**
   * imageDragEnter 
  */
 public imageDragEnter(toIndex: number): void {
   if (this.draggingIndex !== toIndex) {
     this.reorder(this.draggingIndex!, toIndex)
    }
    this.sortFields = this.sortFields.map(field => ({...field, direction: 'none'}))
  }
  
  /**
   * imageDragOver
  */
 public imageDragOver(event: DragEvent) {
    event.preventDefault()
    event.dataTransfer!.dropEffect = 'move'
  }

  /**
   * imageDragEnd 
   */
  public imageDragEnd(): void {
    this.draggingIndex = undefined
  }
  
  private reorder(fromIndex: number, toIndex: number): void {
    const target = this.storedImages.splice(fromIndex, 1)[0]
    
    this.storedImages.splice(toIndex, 0, target)
    this.draggingIndex = toIndex

    this.localStorageService.reorder(fromIndex, toIndex)
  }
}
