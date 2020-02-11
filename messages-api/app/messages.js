const express = require('express');
const fileDB = require('../db');

const multer  = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
  const items = await fileDB.getMessages();
  const dateQuery = req.query.datetime;
  const dateCorrect = new Date(dateQuery);
  let massagesGetFromLastDate = [];
  const errorMessage = {"error": "No correct date"};

  if (!dateQuery) {
    res.send(items);
  } else {
    if (isNaN(dateCorrect.getDate()) === true) {
      res.status(400).send(errorMessage);
    } else {
      items.forEach(item => {
        if(item.datetime > dateQuery) {
          massagesGetFromLastDate.push(item);
        }
      });
      res.send(massagesGetFromLastDate);
    }
  }

});

router.post('/', upload.single('image'), async (req, res) => {
  const errorMessage =  {"error": "Message must be present in the request"};
  
  if (req.file) {
    req.body.image = req.file.filename;
  }

  if (!req.body.author) {
    req.body.author = "Anonymous";
  }

  if (!req.body.message) {
    res.status(400).send(errorMessage);
  }
  
  res.send({id: req.body.id, datetime: req.body.datetime});
  await fileDB.addMessage(req.body);
});

module.exports = router;