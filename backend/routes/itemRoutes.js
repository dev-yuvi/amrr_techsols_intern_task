const express=require("express");
const Item=require("../models/Item.js")
const { v4: uuidv4 } = require('uuid');
const multer=require("multer");
const path=require("path");
const s3=require("../utils/s3.js")

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('coverImage'), async (req, res) => {
  try {
    const { name, type, description } = req.body;
    const file = req.file;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuidv4()}${path.extname(file.originalname)}`,
      Body: file.buffer,
      ContentType: file.mimetype
    };
    
    const uploadResult = await s3.upload(params).promise();
    
    // console.log(uploadResult);

    const newItem = new Item({
      name,
      type,
      description,
      coverImage: uploadResult.Location
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items' });
  }
});

module.exports= router;
