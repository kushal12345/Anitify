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
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const logEvents = async (message, logFilename) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    await fs.promises.mkdir(path.join(__dirname, '..', 'Logger', 'logs'), { recursive: true });
    await fs.promises.appendFile(path.join(__dirname, '..', 'Logger', 'logs', logFilename), logItem);
  } catch (error) {
    console.log(error);
  }
}

const logger = (req,res,next) => {
  if(next){
    logEvents(
      `${req.method}\t${req.url}\t${req.headers.origin}`,
      'reqLog.log'
    );
    next();
  } else {
    logEvents(
      `${req.method ?? "Unknown"}\t${req.url ?? "/"}\t${req.headers ? req.headers.origin : "Unknown"}`,
      'calledLog.log'
    );
  }

}


export { logger as default, logEvents };

