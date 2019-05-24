const isProduction = process.env.NODE_ENV === 'production';
const { createLogger, format, transports } = require('winston');
const Sentry = require('winston-transport-sentry');

export default createLogger({
  level: 'info',
  transports: [
    !isProduction && new transports.Console({ level: 'silly' }),
    isProduction &&
      new Sentry({
        level: 'info',
        dsn: process.env.SENTRY_DEBUG_DSN,
        tags: { key: 'value' },
        extra: { key: 'value' },
      }),
  ].filter(t => t),
});
