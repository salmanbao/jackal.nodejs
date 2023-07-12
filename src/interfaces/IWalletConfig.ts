import { IChainConfig } from '@/interfaces'

export interface IWalletConfig {
  selectedWallet: string
  signerChain?: string
  enabledChains?: string | string[]
  queryAddr?: string
  txAddr?: string
  chainConfig: IChainConfig
}
