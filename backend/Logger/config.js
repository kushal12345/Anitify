import { createLogger, format, transports } from 'winston';


const logger = createLogger({
    level: 'error',
    format: format.json(),
    transports: [
      new transports.File({
        filename: 'error.log',
        dirname: './logger/logs',
      }),
    ],
  });
  
export default logger