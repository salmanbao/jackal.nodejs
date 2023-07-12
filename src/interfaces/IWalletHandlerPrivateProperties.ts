import { AccountData, OfflineSigner } from '@cosmjs/proto-signing'
import { PrivateKey } from 'eciesjs'
import { IProtoHandler } from '@/interfaces/classes'

export interface IWalletHandlerPrivateProperties {
  readonly signer: OfflineSigner
  readonly keyPair: PrivateKey
  rnsInitComplete: boolean
  fileTreeInitComplete: boolean
  readonly jackalAccount: AccountData
  readonly pH: IProtoHandler
}
