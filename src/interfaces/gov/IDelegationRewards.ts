import { ICoin } from '@/interfaces'

export interface IDelegationRewards {
  rewards: { validatorAddress: string; reward: ICoin[] }[]
  total: ICoin[]
}
