/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
import Avatar from '../models/Avatar';

class AvatarController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const avatar = await Avatar.create({
      name,
      path,
    });
    return res.status(201).json(avatar);
  }
}
export default new AvatarController();
