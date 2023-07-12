import { IFileUploadHandler } from '@/interfaces/classes'
import { IFileConfigRaw } from '@/interfaces/file'

export interface IQueueItemPostUpload {
  handler: IFileUploadHandler
  data: IFileConfigRaw | null
}
