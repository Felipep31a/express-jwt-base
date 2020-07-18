class BadParamsException extends Error {
    statusCode: number = 409;
    messages: string[]
    constructor(messages?: string[]) {
      super();
      this.messages = messages;
    }
  }
  
  export default BadParamsException;
  