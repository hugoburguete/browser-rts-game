export interface HTTPErrorResponse {
  status: number;
  error: {
    type: string,
    message: string,
    errors: ErrorCollection[];
  }
}

export interface ErrorCollection {
  message: string;
}

export class HTTPError extends Error {
  public response: HTTPErrorResponse;

  constructor(response: HTTPErrorResponse) {
    super(response.error.message);

    this.response = response;
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

export default HTTPError;