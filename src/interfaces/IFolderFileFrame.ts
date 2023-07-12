import { IFolderChildFiles } from '@/interfaces'

export interface IFolderFileFrame {
  whoAmI: string
  whereAmI: string
  whoOwnsMe: string
  dirChildren: string[]
  fileChildren: IFolderChildFiles
}
