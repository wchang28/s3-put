const url = require('url');
const AWS = require('aws-sdk');
const fs = require('fs');

if (!process.env['S3_ACCESS_KEY_ID']) {
	console.error(`env. var. S3_ACCESS_KEY_ID is not set`);
	process.exit(1);
}
if (!process.env['S3_SECRET_ACCESS_KEY']) {
	console.error(`env. var. S3_SECRET_ACCESS_KEY is not set`);
	process.exit(1);
}

if (process.argv.length < 3)

const filePath = process.argv[2];
const s3_url = process.argv[3];

const parsedUrl = url.parse(s3_url);
//console.log(parsedUrl);
//process.exit(0);
const Bucket = parsedUrl.hostname;
const Key = parsedUrl.pathname.substr(1);

console.log(`Bucket=${Bucket}`);
console.log(`Key=${Key}`);
const s3 = new AWS.S3({
    accessKeyId: process.env['S3_ACCESS_KEY_ID'],
    secretAccessKey: process.env['S3_SECRET_ACCESS_KEY']
});
const Body = fs.readFileSync(filePath);
const params = {Bucket, Key, Body};
s3.upload(params, function(err, data) {
    if (err) {
        throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
});