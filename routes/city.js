const router = require("express").Router();
const City  = require("../models/cities.js");



router.post("/",  (req, res) => {
  

   City.findOne({ name: req.body.name}).then((bdata) => {
    console.log('bdata', bdata)

  if (bdata){
    res.json({ result: true, city: bdata})
  } else {

    res.json({ result: false, error: "City with that name doesn't exist!" })

  }  
});

  });





module.exports = router;