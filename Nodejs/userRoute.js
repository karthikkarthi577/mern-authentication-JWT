const router = require("express").Router();
const User = require("./userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    var emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json("Email already exist");
    }
    var hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    res.json(await user.save());
  } catch (error) {
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    var userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      return res.status(400).json("Email not exist");
    }
    var validpwd = await bcrypt.compare(req.body.password, userData.password);
    if (!validpwd) {
      return res.status(400).json("password not valid");
    }
    let payload = {
      user: {
        id: userData.id,
      },
    };
    var userToken = jwt.sign(payload, "privateKey", {
      expiresIn: 3600000,
    });
    res.header("auth", userToken).send(userToken);
  } catch (error) {
    res.status(400).json(error);
  }
});

//******getting user data after login when we have token */

router.get("/getAll", (req, res) => {
  try {
    jwt.verify(req.header("auth"), "privateKey", async (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const data = await User.find();
        res.json(data);
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

let validate = (req, res, next) => {
  let decode = jwt.verify(req.header("auth"), "privateKey");
  req.user = decode.user;
  next();
};

router.get("/myProfile", validate, async (req, res) => {
  try {
    let exist = await User.findById(req.user.id);
    res.json(exist);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
