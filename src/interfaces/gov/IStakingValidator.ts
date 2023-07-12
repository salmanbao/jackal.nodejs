import { IValidatorDescription } from '@/interfaces'

export interface IStakingValidator {
  operatorAddress: string
  consensusPubkey: any
  jailed: boolean
  status: number
  tokens: string
  delegatorShares: string
  description: IValidatorDescription
  unbondingHeight: number
  unbondingTime: Date
  commission: {
    commissionRates: {
      rate: string
      maxRate: string
      maxChangeRate: string
    }
    updateTime: Date
  }
  minSelfDelegation: string
}
