import User from "../models/User";
import multer from "multer";
import multerConfig from "../config/multerConfig";

const upload = multer(multerConfig).single("photo");

class PhotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      const user = await User.findById(req.id, { password: 0 });

      if (!user) {
        return res.status(422).json({
          message: "User not found",
        });
      }
      if (error) {
        return res.status(401).json({ message: error.code });
      }
      
      const newUser = await User.updateOne(
        { _id: req.id },
        { photo: req.file.filename }
      );
      return res.json(newUser);
    });
  }
}

export default new PhotoController();
