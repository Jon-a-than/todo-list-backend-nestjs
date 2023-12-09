declare interface Env {
  /** 监听 host */
  HOST: string
  /** 监听 port */
  PORT: string
  /** 跨域源 */
  CORS_ORIGIN: string
  /**
   * 需要记录的日志等级 "log" | "error" | "warn" | "debug" | "verbose" | "fatal"
   * 使用逗号分隔
   * @example LOG_LEVELS="log,error,warn,debug,verbose,fatal"
   */
  LOG_LEVELS: string
}
