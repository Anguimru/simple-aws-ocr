## Simple AWS OCR
Simple application to perform OCR using AWS.

Lambda function uploads an image to a S3 Bucket and performs OCR detection using AWS Rekognition.

## Instructions:
git clone [https://github.com/Anguimru/simple-aws-ocr.git](https://github.com/Anguimru/simple-aws-ocr.git)

npm install

zip -r lambda-archive.zip ./*

After zip, upload lambda-archive.zip to your Lambda Function

## Test:
You can use test_api.sh to test if the Lambda and API Endpoint are working.

Expected output should be something like this:

```
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "b073907d-b293-42db-b78d-cb7783f51656",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "TextDetections": [
    {
      "Confidence": 99.05428314208984,
      "DetectedText": "1201058661",
      "Geometry": {
        "BoundingBox": {
          "Height": 0.3734375536441803,
          "Left": 0.029131125658750534,
          "Top": 0.08477631956338882,
          "Width": 0.20919713377952576
        },
        "Polygon": [
          {
            "X": 0.0343257375061512,
            "Y": 0.08477631956338882
          },
          {
            "X": 0.2383282482624054,
            "Y": 0.23163896799087524
          },
          {
            "X": 0.23313364386558533,
            "Y": 0.4582138657569885
          },
          {
            "X": 0.029131125658750534,
            "Y": 0.3113512396812439
          }
        ]
      },
      "Id": 0,
      "Type": "LINE"
    }
  ],
  "TextModelVersion": "3.0"
```
## License Summary
Published under MIT License.

Check LICENSE file for details.
