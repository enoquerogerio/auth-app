import User from "../models/User";
import bcrypt from "bcrypt";

class UserController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      //Validate input
      if (!(email && password)) {
        res.status(400).send("All input is required");
        return;
      }

      //Check if user already exist
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        res.status(409).send("User already exist. Please Login");
        return;
      }

      //encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 8);

      //create user in database
      const user = await User.create({
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
      return res.json(user);
    } catch (error) {
      console.log(error);
      return;
    }
  }
  async index(req, res) {
    try {
      //sort in ascending order byu first_name and do not include password
      const user = await User.find({}, {password: 0});
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  }
  async show(req, res) {
    try {
      const user = await User.findById(req.params.id, { password: 0 });
      return res.json(user);
    } catch (error) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findById(req.id, { password: 0 });

      if (!user) {
        return res.status(422).json({
          message: "User not found",
        });
      }

      //check if the email already exists
      if (req.body.email) {
        const { email } = req.body;
        if (await User.findOne({email})) {
          return res.status(400).json({
            message: "Email already exits",
          });
        }
      }

      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
      }

      const newUser = await User.updateOne({ _id: req.id }, req.body);
      return res.json(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findById(req.id);

      if (!user) {
        return res.status(422).json({
          message: "User not found",
        });
      }

      await User.deleteOne({ _id: req.id });
      res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController();

/*
index -> list all users -> GET
store/create -> create new users -> POST
delete -> delete user -> DELETE
show -> show user -> GET
update -> update user -> PATCH or PUT
*/
