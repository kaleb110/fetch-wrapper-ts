export class FetchError extends Error {
  public status: number;
  public response?: Response;
  public details?: unknown;

  constructor(
    message: string,
    status: number,
    response?: Response,
    details?: unknown
  ) {
    super(message);
    this.status = status;
    this.response = response;
    this.details = details;
    Object.setPrototypeOf(this, FetchError.prototype);
  }
}
