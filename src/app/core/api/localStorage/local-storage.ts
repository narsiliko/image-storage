export interface StoredImage {
  id: string
  title: string
  url: string
  timestamp: number
}

export type SortingDirection = 'asc' | 'desc' | 'none'

export type SortableFields = keyof Omit<StoredImage, 'id' | 'url'>

export type SortingFactor = {
  [key in SortingDirection]: number
}

export interface SortingField {
  id: SortableFields
  name: string
  direction: SortingDirection
}