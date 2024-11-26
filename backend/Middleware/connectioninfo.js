import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const Connectioninfo = async (req, res, next) => {
  const logEntry = {
    timestamp: new Date(),
    clientUrl: req.headers.referer, // URL of the frontend React client
    method: req.method,
    url: req.url,
    params: req.params,
    query: req.query,
    body: req.body,
    headers: req.headers,
    ip: req.ip
  };

  const logData = JSON.stringify(logEntry, null, 2); // Convert logEntry to a string

  try {
    await fs.promises.mkdir(path.join(__dirname, '..', 'Logger', 'logs'), { recursive: true });
    await fs.promises.appendFile(path.join(__dirname, '..', 'Logger', 'logs', 'connInfo.log'), logData + '\n');
  } catch (error) {
    //console.log(error);
  }

  next();
};

export default Connectioninfo;