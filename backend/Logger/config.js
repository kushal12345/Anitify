import { createLogger, format, transports } from 'winston';


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