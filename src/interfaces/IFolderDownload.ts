import { IFileConfigRelevant } from '@/interfaces/file'

export interface IFolderDownload {
  data: ArrayBuffer
  config: IFileConfigRelevant
  key: ArrayBuffer
  iv: ArrayBuffer
}
