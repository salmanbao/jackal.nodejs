import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'
import { Buffer } from 'node:buffer'

import { keyAlgo } from '@/utils/globals'
import { hashAndHex } from '@/utils/hash'
import { IWalletHandler } from '@/interfaces/classes'
import { IAesBundle } from '@/interfaces'

/**
 * Generate a new AES key from scratch.
 * @returns {Buffer} - Fresh random key.
 */
export function genKey(): Buffer {
  return randomBytes(32)
}

/**
 * Generate a new AES iv from scratch.].
 * @returns {Buffer} - Fresh random iv.
 */
export function genIv(): Buffer {
  return randomBytes(16)
}

// TODO - docs
export function aesEncrypt(data: Buffer, key: Buffer, iv: Buffer): Buffer {
  const cipher = createCipheriv(keyAlgo, key, iv)
  const enc = cipher.update(data)
  cipher.final()
  const tag = cipher.getAuthTag
  return enc
}
export function aesDecrypt(data: Buffer, key: Buffer, iv: Buffer): Buffer {
  const decipher = createDecipheriv(keyAlgo, key, iv)
  const dec = decipher.update(data)
  decipher.final()
  return dec
}

/**
 * Encrypts AES iv/CryptoKey set to string using receiver's ECIES public key.
 * @param {IWalletHandler} wallet - Wallet instance for accessing functions.
 * @param {string} pubKey - Receiver's ECIES public key.
 * @param {IAesBundle} aes - AES iv/CryptoKey set to encrypt.
 * @returns {Promise<string>} - Encrypted string with pipe "|" delimiter.
 */
export async function aesToString(
  wallet: IWalletHandler,
  pubKey: string,
  aes: IAesBundle
): Promise<string> {
  const theIv = wallet.asymmetricEncrypt(aes.iv, pubKey)
  const theKey = wallet.asymmetricEncrypt(aes.key, pubKey)
  return `${theIv}|${theKey}`
}

/**
 * Decrypts AES iv/CryptoKey set from string using owner's ECIES private key.
 * @param {IWalletHandler} wallet - Wallet instance for accessing functions and owner's private key.
 * @param {string} source - String containing encrypted AES iv/CryptoKey set with pipe "|" delimiter.
 * @returns {Promise<IAesBundle>} - Decrypted AES iv/CryptoKey set.
 */
export function stringToAes(
  wallet: IWalletHandler,
  source: string
): IAesBundle {
  if (source.indexOf('|') < 0) {
    throw new Error('stringToAes() : Invalid source string')
  }
  const parts = source.split('|')
  return {
    iv: wallet.asymmetricDecrypt(parts[0]),
    key: wallet.asymmetricDecrypt(parts[1])
  }
}

/**
 * Converts raw File to encrypted File.
 * @param {File} workingFile - Source File.
 * @param {Buffer} key - AES-256 key.
 * @param {Buffer} iv - AES-256 iv.
 * @returns {Promise<File>} - Encrypted File.
 */
export async function convertToEncryptedFile(
  workingFile: File,
  key: Buffer,
  iv: Buffer
): Promise<File> {
  const chunkSize = 32 * Math.pow(1024, 2) /** in bytes */
  const details = {
    name: workingFile.name,
    lastModified: workingFile.lastModified,
    type: workingFile.type,
    size: workingFile.size
  }
  const detailsBuf = Buffer.from(JSON.stringify(details))
  const encryptedArray: Buffer[] = [
    Buffer.from((detailsBuf.length + 8).toString().padStart(8, '0')),
    aesEncrypt(detailsBuf, key, iv)
  ]
  for (let i = 0; i < workingFile.size; i += chunkSize) {
    const bufChunk = Buffer.from(await workingFile.slice(i, i + chunkSize).arrayBuffer())
    encryptedArray.push(
      Buffer.from((bufChunk.length + 8).toString().padStart(8, '0')),
      aesEncrypt(bufChunk, key, iv)
    )
  }
  const finalName = `${await hashAndHex(
    details.name + Date.now().toString()
  )}.jkl`
  return new File(encryptedArray, finalName, { type: 'text/plain' })
}

/**
 * Converts raw Blob to decrypted File.
 * @param {Buffer} source - Source raw Buffer.
 * @param {Buffer} key - AES-256 key.
 * @param {Buffer} iv - AES-256 iv.
 * @returns {Promise<File>} - Decrypted File.
 */
export function convertFromEncryptedFile(
  source: Buffer,
  key: Buffer,
  iv: Buffer
): File {
  let detailsBuf = Buffer.from('')
  const bufParts: Buffer[] = []
  for (let i = 0; i < source.length; ) {
    const offset = i + 8
    const segSize = Number(source.slice(i, offset).toString())
    const last = offset + segSize
    const segment = source.slice(offset, last)

    const rawBuf = aesDecrypt(segment, key, iv)
    if (i === 0) {
      detailsBuf = rawBuf
    } else {
      bufParts.push(rawBuf)
    }
    i = last
  }
  const details = JSON.parse(detailsBuf.toString())
  return new File(bufParts, details.name, details)
}

/**
 * Encrypt or decrypt a string using AES-256 (AES-GCM).
 * @param {string} input - Source string to encrypt or decrypt.
 * @param {CryptoKey} key - CryptoKey to use. Decryption CryptoKey must match encryption CryptoKey that was used.
 * @param {Uint8Array} iv - Iv to use. Decryption iv must match encryption iv that was used.
 * @param {"encrypt" | "decrypt"} mode - Toggle between encryption and decryption.
 * @returns {Promise<string>} - Processed result.
 */
export async function cryptString(
  input: string,
  key: Buffer,
  iv: Buffer,
  mode: 'encrypt' | 'decrypt'
): Promise<string> {
  if (mode === 'encrypt') {
    return aesEncrypt(Buffer.from(input), key, iv).toString('base64')
  } else if (mode === 'decrypt') {
    return aesDecrypt(Buffer.from(input), key, iv).toString('utf-8')
  } else {
    throw new Error('cryptString() - Invalid Mode!')
  }
}
