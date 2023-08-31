import path from "path";
import pino from "pino";
import __dirname from "../../config/utils.js";

class Logger {
    constructor() {
        const transport = pino.transport({
            targets: [
                {
                    target: "pino-socket",
                    options: {
                        address: "10.10.10.5",
                        port: 5000,
                        mode: "tcp",
                    },
                },
                {
                    target: "pino/file",
                    options: {
                        destination: path.resolve(
                            __dirname(import.meta.url),
                            "logs",
                            "app.log"
                        ),
                        level: Object.values(pino.levels.labels),
                        mkdir: true,
                    },
                },
            ],
        });

        this._logger = pino(
            {
                timestamp: pino.stdTimeFunctions.isoTime,
                formatters: {
                    level: (label) => {
                        return { level: label.toUpperCase() };
                    },
                },
            },
            process.env.NODE_ENV === "prd" ? transport : null
        );

        this._logger.warn("Logger initialized");
    }

    get logger() {
        return this._logger;
    }
}

export default new Logger().logger;
