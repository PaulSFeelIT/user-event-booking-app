export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly type: string,
    message: string,
    public readonly details?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}