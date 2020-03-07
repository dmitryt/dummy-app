const winston = require('winston');
const expressWinston = require('express-winston');

const PROCESS_ID = process.env.NODE_APP_INSTANCE || 0;
const MT_LOG_APPLICATION_FILENAME = './log/application.log';

const defaultWinstonOptions = {
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
  ),
};

const applicationLogger = winston.createLogger({
  ...defaultWinstonOptions,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ level: true }),
        winston.format.printf((info) => (
          `${info.timestamp.split('T')[1]} ${info.level}: ${info.message}${info.reqId ? ` #${info.reqId}` : ''}`
        )),
      ),
    }),
    new winston.transports.File({
      // log files wildcard: application-*-id.log, access-*-id.log
      filename: MT_LOG_APPLICATION_FILENAME.replace('.log', `-${PROCESS_ID}-id.log`),
      maxFiles: 5,
      maxsize: 10 * 1024 * 1024, // 10Mb
      zippedArchive: true,
      tailable: true,
      format: winston.format.json(), // TODO maybe logstash() would be better?
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// connect express to the winston
expressWinston.requestWhitelist.push('body');

module.exports = applicationLogger;
