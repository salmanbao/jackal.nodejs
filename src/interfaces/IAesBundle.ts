import { Buffer } from 'node:buffer'

export interface IAesBundle {
  iv: Buffer
  key: CryptoKey
}
