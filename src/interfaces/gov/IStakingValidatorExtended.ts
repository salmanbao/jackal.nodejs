import { IStakingValidator } from '@/interfaces/gov'

export interface IStakingValidatorExtended extends IStakingValidator {
  stakedWith: boolean
}
