import { ICoin } from '@/interfaces'
import { IDelegationDetails } from '@/interfaces/gov'

export interface IDelegationSummary {
  delegation: IDelegationDetails
  balance: ICoin
}
