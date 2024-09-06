/*import { createLogger, format, transports } from 'winston';


const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json()
      ),
    transports: [
      new transports.File({
        filename: 'error.log',
        dirname: './Logger/logs',
      }),
    ],
  });
  
export default logger
*/

import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const logEvents = async (message, logFilename) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    if(!fs.existsSync(path.join(__dirname,'..','Logger','logs'))){
      await fsPromises.mkdir(path.join(__dirname,'..','Logger','logs'))
    }
    fs.promises.appendFile(path.join(__dirname,'..','Logger','logs',logFilename),logItem)
  } catch (error) {
    console.log(error)
  }
}

const logger = (req,res,next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reLog.log')
  console.log(`${req.method} ${req.path}`)
  next()
}


export { logger as default, logEvents };

