/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import path from 'path';

class DownloadController {
  async download(req, res) {
    res.type('pdf');
    res.download(path.resolve(__dirname, '..', 'temp', 'upload', `${req.query.path}`));
  }
}
export default new DownloadController();
