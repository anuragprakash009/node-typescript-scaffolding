class HttpResponse<T> {
  private message: string;
  private data: T;
  constructor(message: string, data: T) {
    this.message = message;
    this.data = data;
  }
  getMessage(): string {
    return this.message;
  }
  getData(): T {
    return this.data;
  }
  toJSON(): Object {
    return {
      message: this.message,
      data: this.data,
    };
  }
}

export { HttpResponse };
