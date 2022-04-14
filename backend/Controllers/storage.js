require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.S3_BUCKET;
const region = process.env.S3_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

const uploadFile = (folder, file) => {
    const fileStream = fs.createReadStream(file.path);
    let name = folder !== "Approvals" ?  file.originalname :  file.filename;

    const params = {
        Body: fileStream,
        Bucket: bucketName,
        Key: `${folder}/${name}`,
    };
    return s3.upload(params).promise();
};

exports.uploadProduct = async (req, res) => {
    const { file } = req;
    console.log(file);

    const s3upload = await uploadFile("Products", file);
    console.log(s3upload);
    fs.unlinkSync(file.path);

    res.status(200).json({data: s3upload, filename: `Products-${file.originalname}`})
};

exports.uploadApproval = async (req, res) => {
    const { file } = req;
    console.log(file);

    const s3upload = await uploadFile("Approvals", file);
    console.log(s3upload);
    fs.unlinkSync(file.path);

    res.status(200).json({data: s3upload, filename: `Approvals-${file.filename}`})
};

exports.uploadDimensions = async (req, res) => {
    const { file } = req;
    console.log(file);

    const s3upload = await uploadFile("Dimensions", file);
    console.log(s3upload);
    fs.unlinkSync(file.path);

    res.status(200).json({data: s3upload})
};

exports.uploadTextures = async (req, res) => {
    const { file } = req;
    console.log(file);

    const s3upload = await uploadFile("Textures", file);
    console.log(s3upload);
    fs.unlinkSync(file.path);

    res.status(200).json({data: s3upload})
};


function getFileStream (folder, name) {
    const downloadParams = {
        Key: `${folder}/${name}`,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

exports.download = async (req, res) => {
    const key = req.params.key;
    const k = key.split("-")
    console.log(k)
    const readStream = getFileStream(k[0], k[1])
    readStream.pipe(res)
};
