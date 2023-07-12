import { IFileDetails } from '@/interfaces/file'

export interface IFileBuffer {
  content: ArrayBuffer
  details: IFileDetails
}
