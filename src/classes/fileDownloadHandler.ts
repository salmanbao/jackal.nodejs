import { Buffer } from 'node:buffer'

import { IFileDownloadHandler } from '@/interfaces/classes'
import { PrivateFileDownloadHandler } from '@/classes/privateFileDownloadHandler'
import { convertFromEncryptedFile } from '@/utils/crypt'
import { deprecated } from '@/utils/misc'

export class FileDownloadHandler
  extends PrivateFileDownloadHandler
  implements IFileDownloadHandler
{
  protected constructor(file: File) {
    super(file)
  }

  /**
   * Creates FileDownloadHandler instance.
   * @param {NodeJS Buffer} file - Raw file data direct from download source.
   * @param {CryptoKey} key - AES-256 CryptoKey.
   * @param {Uint8Array} iv - AES-256 iv.
   * @returns {Promise<IFileDownloadHandler>} - FileDownloadHandler instance.
   */
  static async trackFile(
    file: Buffer,
    key: CryptoKey,
    iv: Uint8Array
  ): Promise<IFileDownloadHandler> {
    deprecated('FileDownloadHandler', '1.0.0', { replacement: 'PrivateFileDownloadHandler' })
    const decryptedFile: File = await convertFromEncryptedFile(file, key, iv)
    return new FileDownloadHandler(decryptedFile)
  }
}
