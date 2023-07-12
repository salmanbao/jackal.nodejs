import { IOracleFeed } from '@/interfaces'

export interface IOracleHandler {
  getFeed(name: string): Promise<IOracleFeed>
  getAllFeeds(): Promise<IOracleFeed[]>
}
