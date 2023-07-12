import { OfflineSigner } from '@cosmjs/proto-signing'

export interface IProtoConfig {
  signer: OfflineSigner
  queryUrl?: string
  rpcUrl?: string
}
