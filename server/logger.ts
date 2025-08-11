import pino from "pino";

interface LoggerConfig {
  level: pino.Level;
  transport?: pino.TransportSingleOptions | pino.TransportMultiOptions;
  formatters?: Record<string, any>;
  timestamp?: boolean | (() => string);
  base?: Record<string, any>;
}

// Environment-specific configurations
const loggerConfigs: Record<string, LoggerConfig> = {
  development: {
    level: "debug",
    transport: {
      targets: [
        {
          target: "pino-pretty",
          level: "debug",
          options: {
            destination: 1,
            colorize: true,
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
            messageFormat: "\x1b[36m[{level}]\x1b[0m {msg}",
          },
        },
        {
          target: "pino/file",
          level: "debug",
          options: {
            destination: "./logs/server.log",
            mkdir: true,
          },
        },
      ],
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    base: {
      service: "retrospect-server",
      environment: "development",
      version: process.env.npm_package_version || "unknown",
    },
  },

  test: {
    level: "warn",
    transport: {
      target: "pino-pretty",
      options: {
        destination: 1,
        colorize: false,
        translateTime: false,
      },
    },
    timestamp: false,
    base: {},
  },

  production: {
    level: "info",
    formatters: {
      level: (label: string) => ({ level: label.toUpperCase() }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    base: {
      service: "retrospect-server",
      environment: "production",
      version: "1.0.0",
    },
  },

  staging: {
    level: "debug",
    formatters: {
      level: (label: string) => ({ level: label.toUpperCase() }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    base: {
      service: "retrospect-server",
      environment: "staging",
      version: "1.0.0",
    },
  },
};

function createLogger(): pino.Logger {
  const env = process.env.NODE_ENV || "development";
  const config = loggerConfigs[env];

  // Fallback to development config if environment not found
  if (!config) {
    console.warn(
      `Unknown environment: ${env}, falling back to development logger`
    );
    return createLoggerFromConfig(loggerConfigs.development!);
  }

  return createLoggerFromConfig(config);
}

function createLoggerFromConfig(config: LoggerConfig): pino.Logger {
  const pinoOptions: pino.LoggerOptions = {
    level: config.level,
    timestamp: config.timestamp,
    base: config.base,
    formatters: config.formatters,
  };

  if (config.transport) {
    return pino(pinoOptions, pino.transport(config.transport));
  }

  return pino(pinoOptions);
}

// Create and export the logger instance
export const logger = createLogger();

// Export a function to create child loggers with additional context
export function createChildLogger(context: Record<string, any>): pino.Logger {
  return logger.child(context);
}

// Type-safe request interface
interface RequestWithLogger extends Express.Request {
  logger: pino.Logger;
}

// Export logger utilities for common use cases
export const loggerUtils = {
  // Request logging middleware
  requestLogger: (req: any, res: any, next: any) => {
    if (req.url === "/metrics") {
      return next();
    }

    const start = Date.now();
    const requestId = Math.random().toString(36).substring(7);

    req.logger = logger.child({
      requestId,
      method: req.method,
      url: req.url,
    });

    req.logger.info("Request started");

    res.on("finish", () => {
      const duration = Date.now() - start;
      req.logger.info(
        {
          statusCode: res.statusCode,
          duration: `${duration}ms`,
        },
        "Request completed"
      );
    });

    next();
  },

  // Database query logger
  dbLogger: createChildLogger({ component: "database" }),

  // Socket.io logger
  socketLogger: createChildLogger({ component: "websocket" }),

  // Notification logger
  notificationLogger: createChildLogger({ component: "notifications" }),
};

// Export type for requests with logger
export type { RequestWithLogger };
