const express = require("express");
const router = express.Router();
const demoService = require("./demo.service");
const validateRequest = require("_middleware/validate-request");
const Joi = require("joi");

// routes
router.post("/signup", signupSchema, signup);
module.exports = router;

function signupSchema(req, res, next) {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}
  

async function signup(req, res) {
  const { username, password, email, phone } = req.body;
  // Check if the username already exists
  const existingUser = await demoService.getUserByUsername(username);
  if (existingUser) {
    // Check if the email already exists
    const existingEmail = await demoService.getUserByEmail(email);
    if (existingEmail) {
      // Check if the phone already exists
      const existingPhone = await demoService.getUserByPhone(phone);
      if (existingPhone) {
        return res
          .status(495)
          .json({ error: "User with this phone already exists" });
      }
      return res
        .status(496)
        .json({ error: "User with this email already exists" });
    }
    return res.status(409).json({ error: "Username already exists" });
  }

  // Create a new user
  try{
    const user = await demoService.createUser({
        username,
        password,
        email,
        phone,
      });
      return res.status(201).json({ message: "User created successfully, otp sent to email and phone"});
  }
  catch(error){

  }
  return res.status(500).json({ error: "Server Error"});
}

  