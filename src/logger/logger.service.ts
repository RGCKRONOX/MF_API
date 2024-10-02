import { Injectable } from '@nestjs/common';
import Logger, { ELoggerType } from '../core/Logger';

@Injectable()
export class LoggerService {
    private logger = new Logger(ELoggerType.FILE);

    info(message: string) {
        this.logger.info(message);
    }

    err(message: string) {
        this.logger.err(message);
    }

    warn(message: string) {
        this.logger.warn(message);
    }
}
