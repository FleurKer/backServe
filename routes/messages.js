var express = require('express');
var router = express.Router();
require('../models/connection');
const Message = require('../models/Message');



router.post('/messages', (req, res) => {

    Message.find({ chatroom: req.body.chatroom }).then((bdata) => {
    if (bdata) {

        res.json({bdata});
        
    } else {

      res.json({ result: false, erros: "there's not message" });

    }
  });
       
  });






module.exports = router;