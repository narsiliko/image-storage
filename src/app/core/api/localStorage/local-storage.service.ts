import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { SortingDirection, StoredImage, SortableFields, SortingFactor } from './local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private variableName = 'imagesStore'
  private localStorage$: Subject<StoredImage[]> = new Subject<StoredImage[]>()
  private sortFactor: SortingFactor = {
    'asc': 1,
    'desc': -1,
    'none': 0
  }

  public localStorageListener$: Observable<StoredImage[]> = this.localStorage$.asObservable()

  constructor() { }

  private getData(): StoredImage[] {
    try {
      return JSON.parse(localStorage.getItem(this.variableName) ?? '[]')
    } catch (error) {
      throw new Error(String(error))
    }
  }
  
  private updateData(data: StoredImage[]): void {
    try {
      localStorage.setItem(this.variableName, JSON.stringify(data))
      this.localStorage$.next(data)
    } catch (error) {
      throw new Error(String(error))
    }
  }

  /**
   * read
   */
  public read(): StoredImage[]
  public read(id: string): StoredImage
  public read(id?: string) {
    try {
      if (id) {
        const localStorageData: StoredImage[] = this.getData()

        return localStorageData.find(image => image.id === id)
      } else {
        const localStorageData: StoredImage[] = this.getData()
        
        return localStorageData
      }
    } catch (error) {
      throw new Error(String(error))
    }
  }

  /**
   * add
   */
  public add(data: Omit<StoredImage, 'timestamp'>): boolean {
    try {
      const localStorageData: StoredImage[] = this.getData()
      const timestamp = Date.now()

      localStorageData.push({...data, timestamp})

      this.updateData(localStorageData)

      return true
    } catch (error) {
      throw new Error(String(error))
    }
  }

  /**
   * delete
   */
  public delete(id: string): boolean {
    try {
      const localStorageData: StoredImage[] = this.getData()

      this.updateData(localStorageData.filter(image => image.id !== id))

      return true
    } catch (error) {
      throw new Error(String(error))
    }
  }

  /**
   * sort
   */
  public sort(id: SortableFields, direction: SortingDirection): void {
    const localStorageData: StoredImage[] = this.getData()
    
    localStorageData.sort((a, b) => (a[id] > b[id] ? 1 : -1) * this.sortFactor[direction])

    this.updateData(localStorageData)
  }

  /**
   * reorder
   */
  public reorder(fromIndex: number, toIndex: number): void {
    const localStorageData: StoredImage[] = this.getData()
    const target = localStorageData.splice(fromIndex, 1)[0]
    
    localStorageData.splice(toIndex, 0, target)

    this.updateData(localStorageData)
  }
}
