import chalk from 'chalk'
import { format as utilFormat } from 'node:util'
import { createLogger, format, Logger, transports } from 'winston'
import {
  Injectable,
  ConsoleLogger,
  LoggerService as NestLoggerService,
  LogLevel
} from '@nestjs/common'

@Injectable()
export class LoggerService extends ConsoleLogger implements NestLoggerService {
  private readonly logger: Logger
  private enabledLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose']

  setLogLevels(levels: LogLevel[]) {
    this.enabledLevels = levels
  }

  isLevelEnabled(level: LogLevel): boolean {
    return this.enabledLevels.includes(level)
  }

  constructor() {
    super()

    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json()),
      transports: [
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
          maxsize: 10240,
          maxFiles: 10
        }),
        new transports.File({ maxsize: 204800, maxFiles: 50, filename: 'logs/combined.log' })
      ]
    })
  }

  protected formatContext(context: string): string {
    return chalk.cyan(`${context}`.padEnd(16, ' '))
  }

  protected colorize(message: string, logLevel: LogLevel): string {
    switch (logLevel) {
      case 'log':
        return chalk.green(message)
      case 'error':
        return chalk.red(message)
      case 'warn':
        return chalk.yellow(message)
      case 'debug':
        return chalk.magenta(message)
      case 'verbose':
        return chalk.cyan(message)
      default:
        return message
    }
  }

  protected getTimestamp(): string {
    const timeString = new Date().toLocaleString()
    return chalk.italic.dim(timeString)
  }
  protected formatTimestampDiff(timestampDiff: number): string {
    return chalk.yellow`+${timestampDiff}ms`
  }
  private lastTimestampAt: number = Date.now()
  updateAndGetTimestampDiff(): string {
    const now = Date.now()
    const timestampDiff = now - this.lastTimestampAt
    this.lastTimestampAt = now
    return this.formatTimestampDiff(timestampDiff)
  }

  private winstonMap: Record<LogLevel, string> = {
    log: 'info',
    error: 'error',
    warn: 'warn',
    debug: 'debug',
    verbose: 'verbose',
    fatal: 'error'
  }

  protected formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string
  ): string {
    this.logger[this.winstonMap[logLevel]](message as string, {
      context: contextMessage,
      pidMessage
    })

    const formattedMessage =
      typeof message === 'string'
        ? this.colorize(message as string, logLevel)
        : utilFormat('%j', message)
    const formattedLevel = this.colorize(this.winstonMap[logLevel].padStart(7), logLevel)

    return `${formattedLevel} ${contextMessage} ${this.getTimestamp()} ${formattedMessage} ${timestampDiff}\n`
  }
}
