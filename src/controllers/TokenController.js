import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class TokenController {
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    //check if user send email or password
    if (!email || !password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //check if  email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //check password
    const passwordUser = await bcrypt.compare(password, user.password);
    if (!passwordUser) {
      return res.status(401).json({ message: "Wrong password!" });
    }

    //create token for user
    const id = user._id;
    const token = jwt.sign({ id, email }, process.env.TOKEN_KEY, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({
      token,
      user: {
        email,
        id,
        first_name: user.first_name,
        last_name: user.last_name,
        bio: user.bio,
        phone: user.phone,
      },
    });
  }
}

export default new TokenController();

/*
index -> list all users -> GET
store/create -> create new users -> POST
delete -> delete user -> DELETE
show -> show user -> GET
update -> update user -> PATCH or PUT
*/
