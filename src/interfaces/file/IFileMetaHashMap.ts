import { IFileMeta } from '@/interfaces/file'
import { DeliverTxResponse } from '@cosmjs/stargate';

export interface IFileMetaHashMap {
  [key: string]: IFileMeta
}

export interface IUploadRespnse {
  [key: string]: DeliverTxResponse;
}