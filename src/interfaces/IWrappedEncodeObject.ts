import { EncodeObject } from '@cosmjs/proto-signing'

export interface IWrappedEncodeObject {
  encodedObject: EncodeObject
  modifier?: number
}
