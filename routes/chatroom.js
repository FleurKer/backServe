const router = require("express").Router();
const Chatroom  = require("../models/Chatroom");



router.get("/", async (req, res) => {
  const chatrooms = await Chatroom.find({}).populate('supplier').populate('user'). exec();;

  res.json(chatrooms);

});
router.post("/", async (req, res) => {
  
  const { name, user, supplier } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;
  const chatroomExists = await Chatroom.findOne({ name })
  if (!nameRegex.test(name)) {
    {res.json({ result: false, error: "Chatroom name can contain only alphabets." })}
  
  } else if (chatroomExists){
    {res.json({ result: false, error: "Chatroom with that name already exists!" })}
  } else {

  const chatroom = new Chatroom({
    name, user, supplier
  });

  await chatroom.save().then(newDoc => {
    console.log("data room created", newDoc)

  res.json({ result: true, data: newDoc})
})
}

});

router.get('/chatroom/:id', (req, res) => {

  Chatroom.findById(req.params.id).populate('user').populate('supplier').then((bdata) => {
  if (bdata) {
    console.log("bdata", bdata)
  

      res.json({bdata});
      
  } else {

    res.json({ result: false, erros: "there's not message" });

  }
});
     
});

router.delete("/chatroom", (req, res) => {
  
    Chatroom.deleteOne({_id: req.body._id}).then((data) => {
      if (data) {
          res.json({ result: true, data });
        
      } else {
  
        res.json({ result: false, erros: "there's not chatroom" });
  
      }
    });
  });
module.exports = router;