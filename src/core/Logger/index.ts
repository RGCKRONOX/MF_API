import colors from "colors";
import { fileAppend, filePutContent } from "../helpers/files/files.helper";
import * as fs from "fs";
import * as path from "path";

export enum ELoggerType {
    CONSOLE_LOGGER = "console",
    FILE = "file"
}

export default class Logger {
    private logFilePath = path.join(process.env.API_LOGS_FILE_PATH,"log.txt");

    constructor(private loggerType: ELoggerType) {
        if (loggerType == ELoggerType.FILE) {
            // check if the file has been created
            if (!fs.existsSync(this.logFilePath)) {
                // create the log file
                filePutContent(this.logFilePath, "");
            }
        }
    }

    info(message: string): void {
        let infoLogPrefix = "[INFO] -"
        switch (this.loggerType) {
            case ELoggerType.CONSOLE_LOGGER:
                console.log(colors.blue(`${infoLogPrefix} ${message}`));
            case ELoggerType.FILE:
                fileAppend(this.logFilePath, `${infoLogPrefix} ${message}\r\n`)
        }
    }

    err(message: string): void {
        let infoLogPrefix = "[ERROR] -"
        switch (this.loggerType) {
            case ELoggerType.CONSOLE_LOGGER:
                console.log(colors.red(`${infoLogPrefix} ${message}`));
            case ELoggerType.FILE:
                fileAppend(this.logFilePath, `${infoLogPrefix} ${message}\r\n`)
        }
    }

    warn(message: string): void {
        let infoLogPrefix = "[WARNING] -"
        switch (this.loggerType) {
            case ELoggerType.CONSOLE_LOGGER:
                console.log(colors.yellow(`${infoLogPrefix} ${message}`));
            case ELoggerType.FILE:
                fileAppend(this.logFilePath, `${infoLogPrefix} ${message}\r\n`)
        }
    }

}