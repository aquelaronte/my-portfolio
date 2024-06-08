import {
  DeleteObjectCommand,
  GetObjectAclCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import 'dotenv/config'

export const S3Service = {
  client: new S3Client({
    region: 'auto',
    endpoint: process.env.CLOUDFLARE_R3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
  }),
  bucket: process.env.CLOUDFLARE_R3_BUCKET,
  filesExpiration: 3600,
  sendFile: async (file: File) => {
    const key = Date.now().toString()
    const command = new PutObjectCommand({
      Bucket: S3Service.bucket,
      Key: key,
      Body: file
    })

    const response = await S3Service.client.send(command)

    return { key, response }
  },
  getFile: async (key: string) => {
    const command = new GetObjectAclCommand({
      Bucket: S3Service.bucket,
      Key: key
    })

    const response = await getSignedUrl(S3Service.client, command, {
      expiresIn: S3Service.filesExpiration
    })

    return { expiration: S3Service.filesExpiration, response, key }
  },
  deleteFile: async (key: string) => {
    const command = new DeleteObjectCommand({
      Bucket: S3Service.bucket,
      Key: key
    })

    const response = await S3Service.client.send(command)

    return response
  },
  getFiles: async (keys: string[]) => {
    const files: { expiration: number; response: string; key: string }[] = []

    for (const key of keys) {
      const file = await S3Service.getFile(key)

      files.push(file)
    }

    return files
  }
}
