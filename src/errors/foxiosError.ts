/**
 * Custom error class for Foxios errors.
 */
export class FoxiosError extends Error {
  /** HTTP status code associated with the error. */
  status: number;
  /** The raw response object, if available. */
  response?: Response;
  /** Parsed response data, if available. */
  data?: any;
  /** Flag indicating if the error was due to a timeout. */
  isTimeout?: boolean;
  /** Flag indicating if the request was cancelled. */
  isCanceled?: boolean;

  /**
   * Creates an instance of FoxiosError.
   * @param message - Error message.
   * @param status - HTTP status code.
   * @param response - (Optional) The response object.
   * @param data - (Optional) Parsed response data.
   * @param isTimeout - (Optional) True if the error was due to a timeout.
   * @param isCanceled - (Optional) True if the request was cancelled.
   */
  constructor(
    message: string,
    status: number,
    response?: Response,
    data?: any,
    isTimeout: boolean = false,
    isCanceled: boolean = false
  ) {
    super(message);
    this.name = 'FoxiosError';
    this.status = status;
    this.response = response;
    this.data = data;
    this.isTimeout = isTimeout;
    this.isCanceled = isCanceled;
  }
}
