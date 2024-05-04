interface CustomError {
  getErrorMessage(): string;
  getErrorStatusCode(): number;
}

export { CustomError };
