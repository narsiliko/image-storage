export interface StoredImage {
  id: string
  title: string
  url: string
}

export interface StoredImageRecord extends StoredImage {
  timestamp: number
}

export type ImageSortDirection = 'asc' | 'desc' | 'none'

export type FieldsAvailableForSort = keyof Omit<StoredImageRecord, 'id' | 'url'>

export type SortFactor = {
  [key in ImageSortDirection]: number
}

export interface ImageSortField {
  id: FieldsAvailableForSort
  name: string
  direction: ImageSortDirection
}