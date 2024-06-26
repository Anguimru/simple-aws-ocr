import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
import { RekognitionClient, DetectTextCommand } from "@aws-sdk/client-rekognition"; // ES Modules import

export const handler = async (event, context, callback) => {
    try {

        const requestBody = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;
        console.log("Received binary data:", requestBody);

        const localFileName = "upload_" + Date.now().toString();

        // Upload File to S3
        const s3Client = new S3Client();
        const uploadParams = {
            Bucket: process.env.S3_BUCKET,
            Key: localFileName,
            Body: requestBody
        };

        await s3Client.send(new PutObjectCommand(uploadParams));
        console.log("Object uploaded to " + uploadParams.Bucket + "/" + uploadParams.Key);

        // DetectText
        const params = {
            Image: {
                S3Object: {
                    Bucket: process.env.S3_BUCKET,
                    Name: localFileName
                }
            }
        };

        const rekognitionClient = new RekognitionClient();
        const command = new DetectTextCommand(params);
        const response = await rekognitionClient.send(command);
        console.log(`Detected Text for: ${localFileName}`)
        console.log(JSON.stringify(response, null, 2));
        callback(null, { statusCode: 200, body: JSON.stringify(response, null, 2) });
        // console.log(response)
        // response.TextDetections.forEach(label => {
        //     console.log(`Detected Text: ${label.DetectedText}`),
        //         console.log(`Type: ${label.Type}`),
        //         console.log(`ID: ${label.Id}`),
        //         console.log(`Parent ID: ${label.ParentId}`),
        //         console.log(`Confidence: ${label.Confidence}`),
        //         console.log(`Polygon: `)
        //     console.log(label.Geometry.Polygon)
        // }
        // )
        // callback(null, { statusCode: 200, body: "Success" });
    } catch (error) {
        console.error(error);
        callback(error);
    }
};
