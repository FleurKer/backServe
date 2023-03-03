const Supplier = require("../models/suppliers");
var express = require("express");
const Feedback = require("../models/feedbacks");
const Service = require("../models/services");
var router = express.Router();
require("../models/connection");

router.post("/", (req, res) => {
  const result = [];
  let tab = [];
  const { availableEndDate, availableStartDate, cityName, serviceName  } = req.body;

  // console.log("req.body", req.body);
  Supplier.find()
    .populate("feedbacks")
    .populate({
      path: 'city',
      match: { cityName: { $eq: cityName} },
  
      select: 'cityName -_id'
    }).populate({
      path: 'service',
      match: { serviceName: { $eq: serviceName} },
  
      select: 'serviceName -_id'
    })
    .then((data) => {
      console.log("data du back supplier", data);

      for (let element of data){
        // console.log("element.city", element.city)
    
        if(element.city !== null && element.service !== null){
          tab.push(element)
        }
    
      }
      console.log("tab", tab);


      for (let element of tab) {
       
      //   console.log("test de fin ", element.serviceDetail);
      //   console.log("test condition", new Date(element.availableStartDate).getTime() <=
      //   new Date(availableStartDate).getTime() &&
      // new Date(element.availableEndDate).getTime() >=
      //   new Date(availableEndDate).getTime())

        if (
          new Date(element.availableStartDate).getTime() <=
            new Date(availableStartDate).getTime() &&
          new Date(element.availableEndDate).getTime() >=
            new Date(availableEndDate).getTime()
        ) {
          // console.log("element.feedbacks", element.feedbacks);
          // console.log("element", element);

          let average = 0;
          let total = 0;

          if (element.feedbacks.length > 0) {
            for (let i = 0; i < element.feedbacks.length; i++) {
              total += element.feedbacks[i].note;
            }

            average = total / element.feedbacks.length;
            // console.log("test de moyene", average);
          }

          const newSupplier = {
            id: element._id,
            nom: element.nom,
            prenom: element.prenom,
            serviceDetail: element.serviceDetail,
            supplierPrice: element.supplierPrice,
            note: average,
          };

          result.push(newSupplier);
        }
      }

      console.log("result", result);

      if (result.length > 0) {
        
        res.json({
          result: true,
          data: result,
        });
      } else {
        console.log("pas prout");
        res.json({ result: false, message: "pas de resultat trouvé" });
      }
    });
});


router.post("/supp", async (req, res) => {
  const { cityName, serviceName } = req.body;

  const supplier = await Supplier.find().populate({
    path: 'city',
    match: { cityName: { $eq: cityName} },

    select: 'cityName -_id'
  }).populate({
    path: 'service',
    match: { serviceName: { $eq: serviceName} },

    select: 'serviceName -_id'
  });
  let tab = [];
  for (let element of supplier){
    // console.log("element.city", element.city)

    if(element.city !== null && element.service !== null){
      tab.push(element)
    }

  }
  // console.log("tab", tab)
  res.json(tab);

});

router.get("/supplier", async (req, res) => {
  const supplier = await Supplier.find().populate('city').populate('service');
  res.json(supplier);

});



module.exports = router;
