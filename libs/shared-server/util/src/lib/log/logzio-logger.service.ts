/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import { ConsoleLogger } from '@nestjs/common';

import winston from 'winston';
import LogzioWinstonTransport from 'winston-logzio';

export class LogzioLogger extends ConsoleLogger {
  readonly logger: winston.Logger;

  constructor(readonly logzioToken: string) {
    super();

    const logzioWinstonTransport = new LogzioWinstonTransport({
      token: logzioToken,
      protocol: 'https',
      host: 'listener.logz.io',
      port: '8071',
      type: 'DEV',
      name: 'winston_logzio',
      level: 'verbose',
    });

    this.logger = winston.createLogger({
      format: winston.format.simple(),
      transports: [logzioWinstonTransport],
    });
  }

  log(message: any, ...optionalParams: any[]): void {
    this.logger.log('info', message);
    super.log(message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    this.logger.log('error', message);
    super.error(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): void {
    this.logger.log('warn', message);

    super.warn(message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): void {
    this.logger.log('debug', message);
    super.debug(message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): void {
    this.logger.log('verbose', message);
    super.verbose(message, optionalParams);
  }
}
