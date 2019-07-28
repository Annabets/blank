const {createLogger, format, transports} = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

function getLogger(module) {

    let logger = new createLogger({
        format: format.json(),
        transports: [
            new transports.File({ filename: 'error.log', level: 'error' })
        ]
    });

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console({
            format: combine(
                label({
                    label: module.filename.split('\\').slice(-2).join('\\')
                }),
                timestamp({
                    format: 'MM-DD HH:mm:ss'
                }),
                colorize(),
                myFormat
            )
        }));
    };

    return logger;
}

module.exports = getLogger;