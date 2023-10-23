import { NextRequest, NextResponse } from "next/server";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

export const POST = withApiAuthRequired(async (request: NextRequest) => {
  console.log(request.body)
  const formData = await request.formData()
  console.log(formData)


  try {
    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      }
    })
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: 'test',
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    console.log("url", url)

  } catch (error) {
    console.log(error)
  }

  return NextResponse.json({message: 'Upload successful'})
})
