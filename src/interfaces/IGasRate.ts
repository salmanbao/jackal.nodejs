import { Coin } from '@cosmjs/amino/build/coins'

export interface IGasRate {
  amount: Coin[]
  gas: string
}
