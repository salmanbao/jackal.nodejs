import { EncodeObject } from '@cosmjs/proto-signing'
import { IFileDownloadHandler, IFolderHandler } from '@/interfaces/classes'
import { IUploadList, IUploadRespnse } from '@/interfaces/file'
import { IDownloadDetails, IMiner, IStaggeredTracker } from '@/interfaces'

export interface IFileIo {
  getCurrentProvider(): IMiner
  getAvailableProviders(): IMiner[]
  forceProvider(toSet: IMiner): void
  clearProblems(exclude: string): Promise<void>
  shuffle(): Promise<void>
  refresh(): Promise<void>

  migrate(toCheck: string[]): Promise<void>
  createFolders(parentDir: IFolderHandler, newDirs: string[], gas?: number | string): Promise<void>
  rawCreateFolders(
    parentDir: IFolderHandler,
    newDirs: string[],
    gas?: number | string
  ): Promise<EncodeObject[]>
  verifyFoldersExist(toCheck: string[]): Promise<number>
  staggeredUploadFiles(
    sourceHashMap: IUploadList,
    parent: IFolderHandler,
    tracker: IStaggeredTracker,
    gas?: number | string
  ): Promise<IUploadRespnse>
  downloadFolder(rawPath: string): Promise<IFolderHandler>
  downloadFile(
    downloadDetails: IDownloadDetails,
    completion: { track: number }
  ): Promise<IFileDownloadHandler>
  downloadFileByFid(
    fid: string,
    completion: { track: number }
  ): Promise<IFileDownloadHandler>
  deleteTargets(targets: string[], parent: IFolderHandler): Promise<void>
  rawDeleteTargets(
    targets: string[],
    parent: IFolderHandler
  ): Promise<EncodeObject[]>
  generateInitialDirs(
    initMsg: EncodeObject | null,
    startingDirs?: string[]
  ): Promise<void>
  rawGenerateInitialDirs(
    initMsg: EncodeObject | null,
    startingDirs?: string[]
  ): Promise<EncodeObject[]>
  convertFolderType(rawPath: string): Promise<IFolderHandler>
  rawConvertFolderType(rawPath: string): Promise<EncodeObject[]>
  checkFolderIsFileTree(rawPath: string): Promise<IFolderHandler | null>
}
