import {
  OfflineAminoSigner,
  Secp256k1HdWallet,
  StdSignature
} from '@cosmjs/amino'
import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner
} from '@cosmjs/proto-signing'
import { IMnemonicWallet } from '@/interfaces/classes'

export class MnemonicWallet implements IMnemonicWallet {
  private directWallet: OfflineDirectSigner
  private aminoWallet: OfflineAminoSigner

  /**
   * Receives properties from create() to instantiate CustomWallet for us in creating WalletHandler instance.
   * @param {OfflineDirectSigner} directWallet
   * @param {OfflineAminoSigner} aminoWallet
   * @private
   */
  private constructor(
    directWallet: OfflineDirectSigner,
    aminoWallet: OfflineAminoSigner
  ) {
    this.directWallet = directWallet
    this.aminoWallet = aminoWallet
  }

  /**
   * Async wrapper to create a CustomWallet instance.
   * @param {string} mnemonic - Seed phrase to use to generate the wallet sessions.
   * @returns {Promise<MnemonicWallet>} - Instance of CustomWallet.
   */
  static async create(mnemonic: string) {
    let directWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: 'jkl'
    })
    let aminoWallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: 'jkl'
    })
    /* Destroy mnemonic */
    mnemonic = ''

    return new MnemonicWallet(directWallet, aminoWallet)
  }

  /**
   * Expose DirectSigner for use in WalletHandler.
   * @returns {Promise<OfflineDirectSigner>}
   */
  async getOfflineSignerAuto(): Promise<OfflineDirectSigner> {
    return this.directWallet
  }

  /**
   * Generate signature used by WalletHandler to create session secret.
   * @param {string} address - Jkl address to use for signature.
   * @param {string} message - Value to use as signature base.
   * @returns {Promise<StdSignature>} - Resulting AminoSignResponse.signature.
   */
  async signArbitrary(
    address: string,
    message: string
  ): Promise<StdSignature> {
    const signed = await this.aminoWallet.signAmino(address, {
      chain_id: '',
      account_number: '0',
      sequence: '0',
      fee: {
        gas: '0',
        amount: []
      },
      msgs: [
        {
          type: 'sign/MsgSignData',
          value: {
            signer: address,
            data: btoa(message)
          }
        }
      ],
      memo: ''
    })
    return signed.signature
  }
}
