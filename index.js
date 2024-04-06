const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://hemanshiprajapati811:30esT3wt0KHr0tnS@registration-form-task1.u7kgi02.mongodb.net/?retryWrites=true&w=majority&appName=Registration-form-task1')
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.log("Error in Connecting to Database:", error));

  const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    confirm_password: String,
    email:String
  });

const User = mongoose.model('User', UserSchema);

app.post("/signup", async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("Account already exists");
    }
    const user = new User(req.body);
    await user.save();
    console.log("Record Inserted Successfully");
    res.redirect('success.html');
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, password: password });
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  console.log("Login Successful");
  res.redirect(`/login_successful.html?email=${email}`);
});



app.get("/", (req, res) => {
  res.redirect('index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
