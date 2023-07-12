import { IFileConfigRaw } from '@/interfaces/file'
import { IFileUploadHandler } from '@/interfaces/classes'

export interface IUploadListItem {
  data: null | IFileConfigRaw
  exists: boolean
  handler: IFileUploadHandler
  key: string
  uploadable: File
}
