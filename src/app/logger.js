import path from "path";
import pino from "pino";
import __dirname from "../../config/utils.js";

class Logger {
    constructor() {
        this._logger = pino({
            timestamp: pino.stdTimeFunctions.isoTime,
            formatters: {
                level: (label) => {
                    return { level: label.toUpperCase() };
                },
            },
        });

        this._logger.warn("Logger initialized");
    }

    get logger() {
        return this._logger;
    }
}

export default new Logger().logger;
