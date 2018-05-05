const log = require('log4js');

log.configure({
  appenders: [
    {
      type: 'console',
      level: 'INFO',
    },
    {
      type: 'logLevelFilter',
      level: 'WARN',
      appender: {
        type: 'dateFile',
        filename: 'logs/erros',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        maxLogSize: '1024',
        backups: 3,
      },
    },
  ],
  replaceConsole: true,
});

function logger(category) {
  const c = category || __dirname;
  return log.getLogger(c);
}

module.exports = {
  logger,
  log4j: log,
};
