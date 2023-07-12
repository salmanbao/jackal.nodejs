import { IDelegationSummary, IStakingValidatorExtended } from '@/interfaces/gov'

export interface IStakingValidatorStaked
  extends IStakingValidatorExtended {
  stakedDetails?: IDelegationSummary
}
