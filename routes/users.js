const router = require("express").Router();
const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { token } = require("morgan");
const { checkBody } = require('../modules/checkBody');

router.post("/register", async (req, res) => {
  const { nom, prenom, email, phone, password } = req.body;

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
  const phoneRegex = /^(\+33|0033|0)(6|7)[0-9]{8}$/; 
  console.log(phoneRegex.test(phone))
  const userExists = await User.findOne({
    email,
  });

  if(!checkBody(req.body, ["nom", "prenom"])) {
    {res.json({ result: false, error: "Empty fields are not allowed" })}
  }else  if(!emailRegex.test(email)) {
  {res.json({ result: false, error: "Email is not supported from your domain" })}
 } else if (!phoneRegex.test(phone)) {
  {res.json({ result: false, error: "Phone number is not valid" })}
 } else if(password.length < 8){
  {res.json({ result: false, erros: "Password must be atleast 8 characters long" })}
 } else if (userExists )  {res.json({ result: false, error: "User with same email already exits." })}
  else{
    
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    nom,
    prenom,
    email,
    phone,
    password: hash,
    token: uid2(32),
  });

  await user.save().then(newDoc => {
    res.json({ result: true, token: newDoc.token, firstName: newDoc.prenom});
  });
}
});

router.post("/login", (req, res) => {

  User.findOne({ email: req.body.email }).then(data => {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token, firstName: data.prenom});
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

router.post("/", (req, res) => {
  User.findOne({ token: req.body.token }).then(data => {
    res.json({ result: true, data: data});


  });


});




module.exports = router;
