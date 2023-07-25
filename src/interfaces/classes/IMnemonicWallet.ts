import { OfflineDirectSigner } from '@cosmjs/proto-signing'
import { StdSignature } from '@cosmjs/amino'

export interface IMnemonicWallet {
  getOfflineSignerAuto(): Promise<OfflineDirectSigner>
  signArbitrary(address: string, message: string): Promise<StdSignature>
}
