export interface ICurrency {
  coinDenom: string
  coinMinimalDenom: string
  coinDecimals: number
  gasPriceStep?: {
    low: number
    average: number
    high: number
  }
}
