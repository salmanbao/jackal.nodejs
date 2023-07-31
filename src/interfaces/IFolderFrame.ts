import { IFolderChildFiles } from '@/interfaces'

export interface IFolderFrame {
  whoAmI: string
  whereAmI: string
  whoOwnsMe: string
  dirChildren: string[]
  fileChildren: IFolderChildFiles
}
