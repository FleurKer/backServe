const router = require("express").Router();
const Service = require("../models/services.js");



router.post("/",  (req, res) => {
  

Service.findOne({ name: req.body.name}).then((bdata) => {
    console.log('bdata', bdata)

  if (bdata){
    res.json({ result: true, service: bdata})
  } else {

    res.json({ result: false, error: "Service with that name doesn't exist!" })

  }  
});

  });





module.exports = router;