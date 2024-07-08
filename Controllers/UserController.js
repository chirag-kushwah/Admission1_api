const userModel = require('../models/user')
const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')




cloudinary.config({
  cloud_name: "dkqv3l2kh",
  api_key: "182223573185999",
  api_secret: "lXYq1Ctc8i-xuT-JoN98pE0-Y_s",
});



class UserController {
  static getalluser = async (req, res) => {
    try {
      // res.send('hello user')
      const data = await userModel.find()
      res.status(200).json({
        data
      })
    } catch (error) {
      console.log(error)

    }
  }

  // insert api
static userinsert = async (req, res) => {
    try {
       console.log(req.body)
       const file = req.files.image;
      //image upload
      const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "profileapiimage",
      });
      const { name, email, password, confirmpassword } = req.body;
      const user = await userModel.findOne({ email: email });
      // console.log(user)

      if (user) {
        res
          .status(401)
          .json({ status: "failed", message: "EMAIL ALREADY EXISTS" });
      } else {
        if (name && email && password && confirmpassword) {
          if (password == confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashpassword,
              confirmpassword: confirmpassword,
              image: {
                public_id: uploadImage.public_id,
                url: uploadImage.secure_url,
              },
            });
            await result.save();
            res.status(201).json({
              status: "success",
              message: "Registaration successfull plz login",
            });
          } else {
            res.status(401).json({
              status: "failed",
              message: "password and confirmpassword dosenot same",
            });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "All fields are required" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //login api
  static loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (user != null) {
            const ismatch = await bcrypt.compare(password, user.password);
            // console.log(ismatch)
            if (ismatch) {
                const token = jwt.sign({ ID: user._id }, process.env.JWT_SECRET_KEY);
                res.cookie("token", token);
                res.status(201).json({
                    status: "success",
                    message: "Login Successfully 😃🍻",
                    token,
                    user,
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    message: "'Email and Password is not valid😓",
                });
            }
        } else {
            res
                .status(404)
                .json({ status: "failed", message: "you are not registered user😓" });
        }
    } catch (e) {
        console.log(e);
    }
};

// registerUser api
static registerUser = async (req, res) => {
  //console.log(req.body)
console.log(req.files.image)//

  const file = req.files.image
  const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'userIimage'
  })

  const { name, email, password, conPassword } = req.body
  const user = await userModel.findOne({ email: email })
  if (user) {
      res.status(404).json({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ😓" });
  } else {
      if (name && email && password && conPassword) {
          if (password === conPassword) {
              try {

                  const hashPassword = await bcrypt.hash(password, 10)
                  const data = new userModel({
                      name: name,
                      email: email,
                      password: hashPassword,

                      image: {
                          public_id: myCloud.public_id,
                          url: myCloud.secure_url,
                      },
                  })
                  await data.save()
                  res
                      .status(201)
                      .json({ status: "success", message: "User Registration Successfully 😃🍻" });
              } catch (err) {
                  console.log(err)
              }
          } else {
              res.status(404).json({ status: "failed", message: "'Password and Confirm Password does not match 😓" });
          }
      } else {
          res.status(404).json({ status: "failed", message: "All Fields are required😓" });
      }
  }
}

// delete api
static deleteUser = async (req, res) => {
  try {
      const data = await userModel.findByIdAndDelete(req.params.id)
      res
          .status(200)
          .json({ status: "success", message: "User deleted successfully 😃🍻" });
  } catch (err) {
      console.log(err)
  }
}

// static courseEdit = async (req, res) => {
//   try {
//     const { name, email, image } = req.body;
//     const data = await userModel.findById(req.params.id);
//     //console.log(data);
//     res.render("course/edit", { n: name, i: image, e: email, d: data });
//   } catch (error) {}
// };

}




module.exports = UserController