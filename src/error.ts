export class FoxiosError extends Error {
  status: number;
  response?: Response;
  data?: any;

  constructor(
    message: string,
    status: number,
    response?: Response,
    data?: any
  ) {
    super(message);
    this.name = 'FoxiosError';
    this.status = status;
    this.response = response;
    this.data = data;
  }
}
