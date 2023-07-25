import { Buffer } from 'node:buffer'
import { AccountData, OfflineSigner } from '@cosmjs/proto-signing'
import {
  ICoin,
  IWalletConfig,
  IWalletHandlerPublicProperties
} from '@/interfaces'
import {
  IAbciHandler,
  IFileIo,
  IGovHandler,
  IMnemonicWallet,
  INotificationHandler,
  IOracleHandler,
  IProtoHandler,
  IQueryHandler,
  IRnsHandler,
  IStorageHandler
} from '@/interfaces/classes'

export interface IWalletHandler {
  traits: IWalletHandlerPublicProperties | null
  convertToFullWallet(
    config: IWalletConfig,
    session: IMnemonicWallet
  ): Promise<void>
  voidFullWallet(): void

  getRnsInitStatus(): boolean
  setRnsInitStatus(status: boolean): void
  getStorageInitStatus(): boolean
  setStorageInitStatus(status: boolean): void
  getProtoHandler(): IProtoHandler
  getQueryHandler(): IQueryHandler
  getAccounts(): Promise<readonly AccountData[]>
  getSigner(): OfflineSigner
  getJackalAddress(): string
  getHexJackalAddress(): Promise<string>
  getAllBalances(): Promise<ICoin[]>
  getJackalBalance(): Promise<ICoin>
  getPubkey(): string
  asymmetricEncrypt(toEncrypt: Buffer, pubKey: string): string
  asymmetricDecrypt(toDecrypt: string): Buffer
  findPubKey(address: string): Promise<string>

  /**
   * Handler Factories
   */
  makeAbciHandler(): Promise<IAbciHandler>
  makeFileIoHandler(versionFilter?: string | string[]): Promise<IFileIo | null>
  makeGovHandler(): Promise<IGovHandler>
  makeNotificationHandler(): Promise<INotificationHandler>
  makeOracleHandler(): Promise<IOracleHandler>
  makeRnsHandler(): Promise<IRnsHandler>
  makeStorageHandler(): Promise<IStorageHandler>
}
