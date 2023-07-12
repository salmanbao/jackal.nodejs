import { IAesBundle } from '@/interfaces'
import { TPermsBlockBases } from '@/types/TPermsBlockBases'

export interface IPermsParts {
  aes: IAesBundle
  base: TPermsBlockBases
  num: string
  pubKey: string
  usr: string
}
