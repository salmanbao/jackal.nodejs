import { Buffer } from 'node:buffer'

import { IFileDownloadHandler } from '@/interfaces/classes'
import { convertFromPublicFile } from '@/utils/crypt'

export class PublicFileDownloadHandler implements IFileDownloadHandler {
  protected readonly file: File

  protected constructor(file: File) {
    this.file = file
  }

  /**
   * Creates FileDownloadHandler instance.
   * @param {NodeJS Buffer} file - Raw file data direct from download source.
   * @returns {Promise<IFileDownloadHandler>} - PublicFileDownloadHandler instance.
   */
  static async trackFile(
    file: Buffer
  ): Promise<IFileDownloadHandler> {
    const decryptedFile: File = await convertFromPublicFile(file)
    return new PublicFileDownloadHandler(decryptedFile)
  }

  /**
   * Returns downloaded file in decrypted state.
   * @returns {File}
   */
  receiveBacon(): File {
    return this.file
  }
}
